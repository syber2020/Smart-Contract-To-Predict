
import { RawProvider, StandardProvider } from '@nsl/promised-web3-requestmanager'
import { Address } from 'web3x-es/address'
import { Contract, TxSend } from 'web3x-es/contract'
import { Eth } from 'web3x-es/eth'

export interface EthereumProviderProps {
  ethereumProviderName: string,
  ethereumProvider: RawProvider,
  ethereumRequestManager: StandardProvider
}

interface ContractDefinition {
  methods: any
  events?: any
  eventLogs?: any
}

import { TransactionReceipt } from 'web3x-es/formatters'
import Net from '../../networks.json'

const Networks = Net || {}

// @ts-ignore
// tslint:disable-next-line
function ensurePermissions (props: EthereumProviderProps): Promise<void> {
  return Promise.resolve()
}

export interface Deployable<T extends ContractDefinition, R extends TransactionReceipt> extends Contract<T> {
  deploy (...args: any[]): TxSend<R>
}

export type ContractCreator<T extends Deployable<any, any>> = (eth: Eth, address?: Address) => Promise<T>

export class ContractCache<T extends Deployable<any, any>> {
  /**
   * Gets or creates a new instance of this class
   * @param name the name of the contract
   * @param creator the creator function if new instances need to be made
   */
  public static getInstance<U extends Deployable<any, any>> (name: string, creator: ContractCreator<U>): ContractCache<U> {
    if (ContractCache.constructedInstances[name]) {
      return ContractCache.constructedInstances[name]
    }
    const constructedInstance = new ContractCache(name, creator)
    ContractCache.constructedInstances[name] = constructedInstance
    return constructedInstance
  }

  public static setProps (_props?: EthereumProviderProps): void {
    if (!_props) {
      return
    }
    if (ContractCache.props) {
      if (ContractCache.props.ethereumProvider === _props.ethereumProvider) {
        return
      }
    }
    // new provider: change props
    ContractCache.props = _props
    ContractCache.eth = new Eth(_props.ethereumRequestManager)
    // clear all cached contract instances.
    for (const key of Object.keys(ContractCache.constructedInstances)) {
      ContractCache.constructedInstances[key].clearCache()
    }
  }

  /**
   * A cache of the constructed instances of this class
   */
  private static constructedInstances: {[name: string]: ContractCache<any>} = {}

  /**
   * The Ethereum provider info
   */
  private static props?: EthereumProviderProps

  /**
   * The Ethereum instance
   */
  private static eth?: Eth

  /**
   * Stores the cached instances of the contracts
   */
  private contractsCache: {[networkID: number]: T} = {}

  /**
   * Creates an instance of the contract
   */
  private contractCreator: ContractCreator<T>

  /**
   * The name of the contract
   */
  private contractName: string

  private addressCache: Address[] = []

  private constructor (name: string, creator: ContractCreator<T>) {
    this.contractName = name
    this.contractCreator = creator
  }

  public getSendingAddress (runAsAddressIndex?: string): Promise<Address> {
    if (!ContractCache.eth) {
      return Promise.reject(
        new Error(
          `No Eth instance to give addrs for ${this.contractName}`
        )
      )
    }
    let theAddressIndex: number
    return Promise.resolve().then(() => {
      if (runAsAddressIndex) {
        theAddressIndex = parseInt(runAsAddressIndex, 10)
      } else {
        theAddressIndex = 0
      }
      return Promise.resolve()
    }).then(() => {
      if (this.addressCache && this.addressCache.length) {
        return Promise.resolve(this.addressCache)
      } else {
        return ensurePermissions(
          ContractCache.props as EthereumProviderProps
        ).then(() => {
          return (ContractCache.eth as Eth).getAccounts()
        })
      }
    }).then((accounts: Address[]) => {
      if (!accounts) {
        return Promise.reject(
          new Error(
            `Eth instance haz no accts for ${this.contractName}`
          )
        )
      }
      this.addressCache = accounts

      if (theAddressIndex < 0) {
        return Address.ZERO
      } else if (theAddressIndex > accounts.length) {
        return Promise.reject(
          `Eth instance accounts length ${accounts.length} haz no accounts for idx ${theAddressIndex}`
        )
      } else {
        return Promise.resolve(accounts[theAddressIndex])
      }
    })
  }

  public getOrCreateContractForCurrentNetwork (deployNewIfNoneExists: boolean = false): Promise<T> {
    return Promise.resolve().then(() => {
      if (!ContractCache.eth) {
        return Promise.reject(new Error('Ethereum instance not created'))
      }
      return ContractCache.eth.getId()
    }).then((networkID: number) => {
      if (this.contractsCache[networkID]) {
        return Promise.resolve(
          this.contractsCache[networkID]
        )
      } else {
        return this.findContractForNetwork(
          networkID, deployNewIfNoneExists
        ).then((inst: T) => {
          return Promise.resolve(inst)
        })
      }
    })
  }

  private createContractForNetwork (networkID: number,
                                    deployNewIfNoneExists: boolean): Promise<T> {
    if (!deployNewIfNoneExists) {
      return Promise.reject(
        `${this.contractName} DNE on network ${networkID}`
      )
    }
    return this.getSendingAddress().then((addr: Address) => {
      return this.contractCreator(
        ContractCache.eth as Eth
      ).then((inst: T) => {
        return inst.deploy().send({ from: addr }).getReceipt().then(() => {
          return Promise.resolve(inst)
        })
      })
    }).then((inst: T) => {
      this.addAddressToCache(networkID, inst.address as Address)
      return Promise.resolve(inst)
    })
  }

  private addAddressToCache (networkID: number,
                             contractAddress: Address): void {
    const networkIDStr = networkID.toString()
    // get the info for all contracts
    let allContractsInfo = Networks && Networks.contracts
    if (!allContractsInfo) {
      // @ts-ignore
      Networks.contracts = {}
      allContractsInfo = Networks.contracts
    }
    // get the info for this contract
    // @ts-ignore
    let thisContractInfo = allContractsInfo[this.contractName]
    if (!thisContractInfo) {
      // @ts-ignore
      allContractsInfo[this.contractName] = {}
      // @ts-ignore
      thisContractInfo = allContractsInfo[this.contractName]
    }
    // get the info for all networks this contract is deployed on
    let networkSpecificContractInfo = thisContractInfo.networks
    if (!networkSpecificContractInfo) {
      thisContractInfo.networks = {}
      networkSpecificContractInfo = thisContractInfo.networks
    }
    // get the info for this network
    let contractInfoForThisNetwork = networkSpecificContractInfo[networkIDStr]
    if (!contractInfoForThisNetwork) {
      networkSpecificContractInfo[networkIDStr] = {}
      contractInfoForThisNetwork = networkSpecificContractInfo[networkIDStr]
    }
    // set the address
    contractInfoForThisNetwork.address = contractAddress
  }

  private addContractToState (networkID: number, contract: T): void {
    this.contractsCache[networkID] = contract
  }

  private findContractForNetwork (networkID: number, deployNewIfNoneExists: boolean): Promise<T> {
    const networkIDStr = networkID.toString()
    // Part 0: All info for the contracts
    const allContractInfo = Networks && Networks.contracts
    if (!allContractInfo) {
      return this.createContractForNetwork(
        networkID, deployNewIfNoneExists
      ).then((contract: T) => {
        this.addContractToState(networkID, contract)
        return Promise.resolve(contract)
      })
    }
    // Part 1: Entry in the JSON file for the contract?
    // @ts-ignore
    const contractInfo = allContractInfo[this.contractName]
    if (!contractInfo) {
      return this.createContractForNetwork(
        networkID, deployNewIfNoneExists
      ).then((contract: T) => {
        this.addContractToState(networkID, contract)
        return Promise.resolve(contract)
      })
    }
    // Part 2: Entry in that part of the JSON file for all networkIDs
    const networkSpecificContractInfo = contractInfo && contractInfo.networks
    if (!networkSpecificContractInfo) {
      return this.createContractForNetwork(
        networkID, deployNewIfNoneExists
      ).then((contract: T) => {
        this.addContractToState(networkID, contract)
        return Promise.resolve(contract)
      })
    }
    // Part 3: Entry in that part of the JSON file for the current network
    const contractInfoForThisNetwork = networkSpecificContractInfo[networkIDStr]
    if (!contractInfoForThisNetwork) {
      return this.createContractForNetwork(
        networkID, deployNewIfNoneExists
      ).then((contract: T) => {
        this.addContractToState(networkID, contract)
        return Promise.resolve(contract)
      })
    }
    // Part 4: Address for that contractID?
    const contractAddress = contractInfoForThisNetwork.address
    if (!contractAddress) {
      return this.createContractForNetwork(
        networkID, deployNewIfNoneExists
      ).then((contract: T) => {
        this.addContractToState(networkID, contract)
        return Promise.resolve(contract)
      })
    }
    // Part 5: Create instance wrapping already-deployed contract
    return this.contractCreator(
      ContractCache.eth as Eth, contractAddress
    ).then((contract: T) => {
      this.addContractToState(networkID, contract)
      return Promise.resolve(contract)
    })
  }

  private clearCache (): void {
    this.contractsCache = {}
  }
}
