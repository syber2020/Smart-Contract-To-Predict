import BN from "bn.js";
import { Address } from "web3x-es/address";
import { EventLog, TransactionReceipt } from "web3x-es/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x-es/contract";
import { Eth } from "web3x-es/eth";
import abi from "./TrafPerfTcpAbi";
interface TrafPerfTcpEvents {
}
interface TrafPerfTcpEventLogs {
}
interface TrafPerfTcpTxEventLogs {
}
export interface TrafPerfTcpTransactionReceipt extends TransactionReceipt<TrafPerfTcpTxEventLogs> {
}
interface TrafPerfTcpMethods {
    sum_tcp_path1(_datatcp1: (number | string | BN)[]): TxSend<TrafPerfTcpTransactionReceipt>;
    sum_tcp_path2(_datatcp2: (number | string | BN)[]): TxSend<TrafPerfTcpTransactionReceipt>;
    sum_tcp_path3(_datatcp3: (number | string | BN)[]): TxSend<TrafPerfTcpTransactionReceipt>;
    sum_tcp_path4(_datatcp4: (number | string | BN)[]): TxSend<TrafPerfTcpTransactionReceipt>;
    sum_tcp_path5(_datatcp5: (number | string | BN)[]): TxSend<TrafPerfTcpTransactionReceipt>;
    sum_tcp_path6(_datatcp6: (number | string | BN)[]): TxSend<TrafPerfTcpTransactionReceipt>;
    Set_Route_Path(): TxCall<string>;
}
export interface TrafPerfTcpDefinition {
    methods: TrafPerfTcpMethods;
    events: TrafPerfTcpEvents;
    eventLogs: TrafPerfTcpEventLogs;
}
export class TrafPerfTcp extends Contract<TrafPerfTcpDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
    deploy(): TxSend<TrafPerfTcpTransactionReceipt> {
        return super.deployBytecode("0x60806040526040805190810160405280600581526020017f706174683100000000000000000000000000000000000000000000000000000081525060009080519060200190620000519291906200023a565b506040805190810160405280600581526020017f7061746832000000000000000000000000000000000000000000000000000000815250600190805190602001906200009f9291906200023a565b506040805190810160405280600581526020017f706174683300000000000000000000000000000000000000000000000000000081525060029080519060200190620000ed9291906200023a565b506040805190810160405280600581526020017f7061746834000000000000000000000000000000000000000000000000000000815250600390805190602001906200013b9291906200023a565b506040805190810160405280600581526020017f706174683500000000000000000000000000000000000000000000000000000081525060049080519060200190620001899291906200023a565b506040805190810160405280600581526020017f706174683600000000000000000000000000000000000000000000000000000081525060059080519060200190620001d79291906200023a565b506040805190810160405280600d81526020017f6578697374696e6720706174680000000000000000000000000000000000000081525060069080519060200190620002259291906200023a565b503480156200023357600080fd5b50620002e9565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200027d57805160ff1916838001178555620002ae565b82800160010185558215620002ae579182015b82811115620002ad57825182559160200191906001019062000290565b5b509050620002bd9190620002c1565b5090565b620002e691905b80821115620002e2576000816000905550600101620002c8565b5090565b90565b610b5280620002f96000396000f300608060405260043610610082576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806292844c146100875780630f5d2ee1146100e05780639ce1a8d514610139578063a0f8fc87146101c9578063d357c18414610222578063ed9421831461027b578063f03498c8146102d4575b600080fd5b6100de6004803603810190808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919291929050505061032d565b005b6101376004803603810190808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919291929050505061037c565b005b34801561014557600080fd5b5061014e6103cb565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561018e578082015181840152602081019050610173565b50505050905090810190601f1680156101bb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610220600480360381019080803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506109ea565b005b61027960048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050610a39565b005b6102d260048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050610a88565b005b61032b60048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050610ad7565b005b600080600881905550600090505b815181101561037857818181518110151561035257fe5b90602001906020020151600860008282540192505081905550808060010191505061033b565b5050565b600080600781905550600090505b81518110156103c75781818151811015156103a157fe5b90602001906020020151600760008282540192505081905550808060010191505061038a565b5050565b60606008546007541080156103e35750600954600754105b80156103f25750600a54600754105b80156104015750600b54600754105b80156104105750600c54600754105b156104b75760008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104ab5780601f10610480576101008083540402835291602001916104ab565b820191906000526020600020905b81548152906001019060200180831161048e57829003601f168201915b505050505090506109e7565b6007546008541080156104cd5750600954600854105b80156104dc5750600a54600854105b80156104eb5750600b54600854105b80156104fa5750600c54600854105b156105a15760018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105955780601f1061056a57610100808354040283529160200191610595565b820191906000526020600020905b81548152906001019060200180831161057857829003601f168201915b505050505090506109e7565b6008546009541080156105b75750600754600954105b80156105c65750600a54600954105b80156105d55750600b54600954105b80156105e45750600c54600954105b1561068b5760028054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561067f5780601f106106545761010080835404028352916020019161067f565b820191906000526020600020905b81548152906001019060200180831161066257829003601f168201915b505050505090506109e7565b600854600a541080156106a15750600954600a54105b80156106b05750600754600a54105b80156106bf5750600b54600a54105b80156106ce5750600c54600a54105b156107755760038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107695780601f1061073e57610100808354040283529160200191610769565b820191906000526020600020905b81548152906001019060200180831161074c57829003601f168201915b505050505090506109e7565b600854600b5410801561078b5750600954600b54105b801561079a5750600a54600b54105b80156107a95750600754600b54105b80156107b85750600c54600b54105b1561085f5760048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108535780601f1061082857610100808354040283529160200191610853565b820191906000526020600020905b81548152906001019060200180831161083657829003601f168201915b505050505090506109e7565b600854600c541080156108755750600954600c54105b80156108845750600a54600c54105b80156108935750600b54600c54105b80156108a25750600754600c54105b156109495760058054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561093d5780601f106109125761010080835404028352916020019161093d565b820191906000526020600020905b81548152906001019060200180831161092057829003601f168201915b505050505090506109e7565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109df5780601f106109b4576101008083540402835291602001916109df565b820191906000526020600020905b8154815290600101906020018083116109c257829003601f168201915b505050505090505b90565b600080600a81905550600090505b8151811015610a35578181815181101515610a0f57fe5b90602001906020020151600a6000828254019250508190555080806001019150506109f8565b5050565b600080600b81905550600090505b8151811015610a84578181815181101515610a5e57fe5b90602001906020020151600b600082825401925050819055508080600101915050610a47565b5050565b600080600981905550600090505b8151811015610ad3578181815181101515610aad57fe5b906020019060200201516009600082825401925050819055508080600101915050610a96565b5050565b600080600c81905550600090505b8151811015610b22578181815181101515610afc57fe5b90602001906020020151600c600082825401925050819055508080600101915050610ae5565b50505600a165627a7a7230582029dc4e3409ef0715f6c043a2c1eb0ed348e25a8461592cf6ffb241c00b6e42e60029") as any;
    }
}
export var TrafPerfTcpAbi = abi;