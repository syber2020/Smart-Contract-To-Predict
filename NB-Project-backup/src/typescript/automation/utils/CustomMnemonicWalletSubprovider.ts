import {
  JSONRPCRequestPayload,
  MnemonicWalletSubprovider,
  MnemonicWalletSubproviderConfigs
} from '@0x/subproviders'

export class CustomMnemonicWalletSubprovider extends MnemonicWalletSubprovider {
  private _mAddressSearchLimit: number

  constructor (config: MnemonicWalletSubproviderConfigs) {
    super(config)
    this._mAddressSearchLimit = config.addressSearchLimit || 10
  }

  public getAccountsAsync (numberOfAccounts?: number): Promise<string[]> {
    // tslint:disable-next-line
    if (!numberOfAccounts) {
      numberOfAccounts = this._mAddressSearchLimit
    }
    // tslint:disable-next-line
    return super.getAccountsAsync(numberOfAccounts)
  }

  public async handleRequest (payload: JSONRPCRequestPayload, next: () => void, end: (err: (Error | null), data?: any) => void): Promise<void> {
    if (payload.method === 'eth_requestAccounts') {
      try {
        const accounts = await this.getAccountsAsync()
        end(null, accounts)
      } catch (err) {
        end(err)
      }
      return
    } else {
      return super.handleRequest(payload, next, end)
    }
  }
}
