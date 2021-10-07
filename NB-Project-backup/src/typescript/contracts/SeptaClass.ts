import BN from "bn.js";
import { Address } from "web3x-es/address";
import { EventLog, TransactionReceipt } from "web3x-es/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x-es/contract";
import { Eth } from "web3x-es/eth";
import abi from "./SeptaClassAbi";
interface SeptaClassEvents {
}
interface SeptaClassEventLogs {
}
interface SeptaClassTxEventLogs {
}
export interface SeptaClassTransactionReceipt extends TransactionReceipt<SeptaClassTxEventLogs> {
}
interface SeptaClassMethods {
    a_getparameters0(x1: number | string | BN, x2: number | string | BN, x3: number | string | BN, x4: number | string | BN, v1: number | string | BN, v2: number | string | BN, v3: number | string | BN, v4: number | string | BN, m1: number | string | BN, m2: number | string | BN, m3: number | string | BN, m4: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    b_getparameters1(x1: number | string | BN, x2: number | string | BN, x3: number | string | BN, x4: number | string | BN, v1: number | string | BN, v2: number | string | BN, v3: number | string | BN, v4: number | string | BN, m1: number | string | BN, m2: number | string | BN, m3: number | string | BN, m4: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    b_getparameters2(x1: number | string | BN, x2: number | string | BN, x3: number | string | BN, x4: number | string | BN, v1: number | string | BN, v2: number | string | BN, v3: number | string | BN, v4: number | string | BN, m1: number | string | BN, m2: number | string | BN, m3: number | string | BN, m4: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    b_getparameters3(x1: number | string | BN, x2: number | string | BN, x3: number | string | BN, x4: number | string | BN, v1: number | string | BN, v2: number | string | BN, v3: number | string | BN, v4: number | string | BN, m1: number | string | BN, m2: number | string | BN, m3: number | string | BN, m4: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    b_getparameters4(x1: number | string | BN, x2: number | string | BN, x3: number | string | BN, x4: number | string | BN, v1: number | string | BN, v2: number | string | BN, v3: number | string | BN, v4: number | string | BN, m1: number | string | BN, m2: number | string | BN, m3: number | string | BN, m4: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    b_getparameters5(x1: number | string | BN, x2: number | string | BN, x3: number | string | BN, x4: number | string | BN, v1: number | string | BN, v2: number | string | BN, v3: number | string | BN, v4: number | string | BN, m1: number | string | BN, m2: number | string | BN, m3: number | string | BN, m4: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    b_getparameters6(x1: number | string | BN, x2: number | string | BN, x3: number | string | BN, x4: number | string | BN, v1: number | string | BN, v2: number | string | BN, v3: number | string | BN, v4: number | string | BN, m1: number | string | BN, m2: number | string | BN, m3: number | string | BN, m4: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    c_printparamaters0(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
    }>;
    d_printparamaters1(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
    }>;
    c_printparamaters2(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
    }>;
    d_printparamaters3(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
    }>;
    c_printparamaters4(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
    }>;
    d_printparamaters5(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
    }>;
    d_printparamaters6(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
    }>;
    e_exponent(e0: number | string | BN, e1: number | string | BN, f0: number | string | BN, f1: number | string | BN, g0: number | string | BN, g1: number | string | BN, h0: number | string | BN, h1: number | string | BN, Prior0: number | string | BN, Prior1: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    test(Prior0: number | string | BN, Prior1: number | string | BN, Prior2: number | string | BN, Prior3: number | string | BN, Prior4: number | string | BN, Prior5: number | string | BN, Prior6: number | string | BN): TxSend<SeptaClassTransactionReceipt>;
    printall(): TxCall<{
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    }>;
    f_compare(): TxCall<string>;
}
export interface SeptaClassDefinition {
    methods: SeptaClassMethods;
    events: SeptaClassEvents;
    eventLogs: SeptaClassEventLogs;
}
export class SeptaClass extends Contract<SeptaClassDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
    deploy(): TxSend<SeptaClassTransactionReceipt> {
        return super.deployBytecode("0x608060405234801561001057600080fd5b50612073806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063840ae7fc116100a2578063ba349bd911610071578063ba349bd9146105fc578063bb03ce6f1461062f578063c510e666146106cc578063f0c95b7614610769578063fbdfe8c11461078757610116565b8063840ae7fc14610530578063904c7c191461056357806393ceb21b14610596578063aded2281146105c957610116565b8063409189e6116100e9578063409189e61461026657806343946b2c146103035780635217f0211461036d578063600ba4eb146103f657806375dda0901461049357610116565b8063017b23a31461011b57806314e77101146101b85780631ab51403146101eb57806331adf40c1461021e575b600080fd5b6101b6600480360361018081101561013257600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050610824565b005b6101c06108b5565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b6101f36108d5565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b6102266108f5565b6040518088815260200187815260200186815260200185815260200184815260200183815260200182815260200197505050505050505060405180910390f35b610301600480360361018081101561027d57600080fd5b8101908080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919050505061092c565b005b61036b600480360360e081101561031957600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291905050506109bd565b005b6103f4600480360361014081101561038457600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291905050506118f8565b005b610491600480360361018081101561040d57600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611a35565b005b61052e60048036036101808110156104aa57600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611ac6565b005b610538611b57565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b61056b611b77565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b61059e611b97565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b6105d1611bb7565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b610604611bd7565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b6106ca600480360361018081101561064657600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611bf7565b005b61076760048036036101808110156106e357600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611c88565b005b610771611d19565b6040518082815260200191505060405180910390f35b610822600480360361018081101561079e57600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050611fb6565b005b60016007819055508486888a0202026009819055508486888a020202600d81905550838c03848d0302603181905550828b03838c0302603281905550818a03828b0302603381905550808903818a030260348190555085878960345402020285888a60335402020286888b60325402020287898b603154020202010101600b81905550505050505050505050505050565b600080600080601854601954601a54601b54935093509350935090919293565b600080600080600754600954600b54600d54935093509350935090919293565b6000806000806000806000602454602554602654602754602854602954602a54965096509650965096509650965090919293949596565b60016020819055508486888a0202026021819055508486888a020202602381905550838c03848d0302603181905550828b03838c0302603281905550818a03828b0302603381905550808903818a030260348190555085878960345402020285888a60335402020286888b60325402020287898b603154020202010101602281905550505050505050505050505050565b6109df600654600754600854600954600a54600b54600c54600d548f8f6118f8565b602c54602b541215610a01576103e86025819055506000602481905550610a13565b6103e860248190555060006025819055505b610a356010546014546011546015546012546016546013546017548d8d6118f8565b602c54602b541215610a57576103e86027819055506000602681905550610a69565b6103e860268190555060006027819055505b610a8b601854601c54601954601d54601a54601e54601b54601f548b8b6118f8565b602c54602b541215610aad576103e86029819055506000602881905550610abf565b6103e860288190555060006029819055505b602554602454138015610ad55750602754602654135b8015610ae45750602954602854135b15610c8a57610b0b600654601054600854601154600a54601254600c546013548f8e6118f8565b602c54602b541315610bd0576001602681905550610b41600654601854600854601954600a54601a54600c54601b548f8c6118f8565b602c54602b541315610b8e576001602881905550610b77600654602054600854602154600a54602254600c546023548f8a6118f8565b602b54602481905550602c54602a81905550610bcb565b6001602481905550610bb8601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b610c85565b6002602481905550610bfa601054601854601154601954601254601a54601354601b548d8c6118f8565b602c54602b541315610c47576002602881905550610c306010546020546011546021546012546022546013546023548d8a6118f8565b602b54602681905550602c54602a81905550610c84565b6002602681905550610c71601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b5b6118ef565b602554602454138015610ca05750602754602654135b8015610caf5750602854602954135b15610e5557610cd6600654601054600854601154600a54601254600c546013548f8e6118f8565b602c54602b541315610d9b576003602681905550610d0c600654601c54600854601d54600a54601e54600c54601f548f8b6118f8565b602c54602b541315610d59576003602981905550610d42600654602054600854602154600a54602254600c546023548f8a6118f8565b602b54602481905550602c54602a81905550610d96565b6003602481905550610d83601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b610e50565b6004602481905550610dc5601054601c54601154601d54601254601e54601354601f548d8b6118f8565b602c54602b541315610e12576004602981905550610dfb6010546020546011546021546012546022546013546023548d8a6118f8565b602b54602681905550602c54602a81905550610e4f565b6004602681905550610e3c601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b5b6118ee565b602554602454138015610e6b5750602654602754135b8015610e7a5750602954602854135b1561102057610ea1600654601454600854601554600a54601654600c546017548f8d6118f8565b602c54602b541315610f66576005602781905550610ed7600654601854600854601954600a54601a54600c54601b548f8c6118f8565b602c54602b541315610f24576005602881905550610f0d600654602054600854602154600a54602254600c546023548f8a6118f8565b602b54602481905550602c54602a81905550610f61565b6005602481905550610f4e601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b61101b565b6006602481905550610f90601454601854601554601954601654601a54601754601b548c8c6118f8565b602c54602b541315610fdd576006602881905550610fc66014546020546015546021546016546022546017546023548c8a6118f8565b602b54602781905550602c54602a8190555061101a565b6006602781905550611007601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b5b6118ed565b6025546024541380156110365750602654602754135b80156110455750602854602954135b156111eb5761106c600654601454600854601554600a54601654600c546017548f8d6118f8565b602c54602b5413156111315760076027819055506110a2600654601c54600854601d54600a54601e54600c54601f548f8b6118f8565b602c54602b5413156110ef5760076029819055506110d8600654602054600854602154600a54602254600c546023548f8a6118f8565b602b54602481905550602c54602a8190555061112c565b6007602481905550611119601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b6111e6565b600860248190555061115b601454601c54601554601d54601654601e54601754601f548c8b6118f8565b602c54602b5413156111a85760086029819055506111916014546020546015546021546016546022546017546023548c8a6118f8565b602b54602781905550602c54602a819055506111e5565b60086027819055506111d2601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b5b6118ec565b6024546025541380156112015750602754602654135b80156112105750602954602854135b156113b657611237600754601054600954601154600b54601254600d546013548e8e6118f8565b602c54602b5413156112fc57600960268190555061126d600754601854600954601954600b54601a54600d54601b548e8c6118f8565b602c54602b5413156112ba5760096028819055506112a3600754602054600954602154600b54602254600d546023548e8a6118f8565b602b54602581905550602c54602a819055506112f7565b60096025819055506112e4601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b6113b1565b600a602581905550611326601054601854601154601954601254601a54601354601b548d8c6118f8565b602c54602b54131561137357600a60288190555061135c6010546020546011546021546012546022546013546023548d8a6118f8565b602b54602681905550602c54602a819055506113b0565b600a60268190555061139d601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b5b6118eb565b6024546025541380156113cc5750602754602654135b80156113db5750602854602954135b1561158157611402600754601054600954601154600b54601254600d546013548e8e6118f8565b602c54602b5413156114c757600b602681905550611438600754601c54600954601d54600b54601e54600d54601f548e8b6118f8565b602c54602b54131561148557600b60298190555061146e600754602054600954602154600b54602254600d546023548e8a6118f8565b602b54602581905550602c54602a819055506114c2565b600b6025819055506114af601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b61157c565b600c6025819055506114f1601054601c54601154601d54601254601e54601354601f548d8b6118f8565b602c54602b54131561153e57600c6029819055506115276010546020546011546021546012546022546013546023548d8a6118f8565b602b54602681905550602c54602a8190555061157b565b600c602681905550611568601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b5b6118ea565b6024546025541380156115975750602654602754135b80156115a65750602954602854135b1561174c576115cd600754601454600954601554600b54601654600d546017548e8d6118f8565b602c54602b54131561169257600d602781905550611603600754601854600954601954600b54601a54600d54601b548e8c6118f8565b602c54602b54131561165057600d602881905550611639600754602054600954602154600b54602254600d546023548e8a6118f8565b602b54602581905550602c54602a8190555061168d565b600d60258190555061167a601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b611747565b600e6025819055506116bc601454601854601554601954601654601a54601754601b548c8c6118f8565b602c54602b54131561170957600e6028819055506116f26014546020546015546021546016546022546017546023548c8a6118f8565b602b54602781905550602c54602a81905550611746565b600e602681905550611733601854602054601954602154601a54602254601b546023548b8a6118f8565b602b54602881905550602c54602a819055505b5b6118e9565b61176e600754601454600954601554600b54601654600d546017548e8d6118f8565b602c54602b54131561183357600f6027819055506117a4600754601c54600954601d54600b54601e54600d54601f548e8b6118f8565b602c54602b5413156117f157600f6029819055506117da600754602054600954602154600b54602254600d546023548e8a6118f8565b602b54602581905550602c54602a8190555061182e565b600f60258190555061181b601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b6118e8565b601060258190555061185d601454601c54601554601d54601654601e54601754601f548c8b6118f8565b602c54602b5413156118aa5760106029819055506118936014546020546015546021546016546022546017546023548c8a6118f8565b602b54602781905550602c54602a819055506118e7565b60106026819055506118d4601c54602054601d54602154601e54602254601f546023548a8a6118f8565b602b54602981905550602c54602a819055505b5b5b5b5b5b5b5b5b50505050505050565b868a026035819055508888026036819055508385028387020360378190555082840260388190555060385460375481151561192f57fe5b05600e8190555060385460375481151561194557fe5b07600f81905550603854603854603854603854020202601802600481905550600f54600f54600f54600f540202026038546004600f54600f54600f5402020202603854603854600c600f54600f54020202026038546038546038546018600f5402020202603854603854603854603854601802020202010101016005819055506000600e541215156119ff578182600454600160355402020202602b8190555080816005546103e860365402020202602c81905550611a29565b81826004546103e860355402020202602b819055508081600554600160365402020202602c819055505b50505050505050505050565b60016006819055508486888a0202026008819055508486888a020202600c81905550838c03848d0302603181905550828b03838c0302603281905550818a03828b0302603381905550808903818a030260348190555085878960345402020285888a60335402020286888b60325402020287898b603154020202010101600a81905550505050505050505050505050565b6001601c819055508486888a020202601d819055508486888a020202601f81905550838c03848d0302603181905550828b03838c0302603281905550818a03828b0302603381905550808903818a030260348190555085878960345402020285888a60335402020286888b60325402020287898b603154020202010101601e81905550505050505050505050505050565b600080600080602054602154602254602354935093509350935090919293565b600080600080601c54601d54601e54601f54935093509350935090919293565b600080600080601054601154601254601354935093509350935090919293565b600080600080600654600854600a54600c54935093509350935090919293565b600080600080601454601554601654601754935093509350935090919293565b60016014819055508486888a0202026015819055508486888a020202601781905550838c03848d0302603181905550828b03838c0302603281905550818a03828b0302603381905550808903818a030260348190555085878960345402020285888a60335402020286888b60325402020287898b603154020202010101601681905550505050505050505050505050565b60016018819055508486888a0202026019819055508486888a020202601b81905550838c03848d0302603181905550828b03838c0302603281905550818a03828b0302603381905550808903818a030260348190555085878960345402020285888a60335402020286888b60325402020287898b603154020202010101601a81905550505050505050505050505050565b60008060009050600060019050600060029050600060039050600060049050600060059050600060069050602554602454138015611d5a5750602654602454135b8015611d695750602754602454135b8015611d785750602854602454135b8015611d875750602954602454135b8015611d965750602a54602454135b15611daa5786975050505050505050611fb3565b602654602554138015611dc05750602454602554135b8015611dcf5750602754602554135b8015611dde5750602854602554135b8015611ded5750602954602554135b8015611dfc5750602a54602554135b15611e105785975050505050505050611fb3565b602454602654138015611e265750602554602654135b8015611e355750602754602654135b8015611e445750602854602654135b8015611e535750602954602654135b8015611e625750602a54602654135b15611e765784975050505050505050611fb3565b602454602754138015611e8c5750602554602754135b8015611e9b5750602654602754135b8015611eaa5750602854602754135b8015611eb95750602954602754135b8015611ec85750602a54602754135b15611edc5783975050505050505050611fb3565b602454602854138015611ef25750602554602854135b8015611f015750602654602854135b8015611f105750602754602854135b8015611f1f5750602954602854135b8015611f2e5750602a54602854135b15611f425782975050505050505050611fb3565b602454602954138015611f585750602554602954135b8015611f675750602654602954135b8015611f765750602754602954135b8015611f855750602854602954135b8015611f945750602a54602954135b15611fa85781975050505050505050611fb3565b809750505050505050505b90565b60016010819055508486888a0202026011819055508486888a020202601381905550838c03848d0302603181905550828b03838c0302603281905550818a03828b0302603381905550808903818a030260348190555085878960345402020285888a60335402020286888b60325402020287898b60315402020201010160128190555050505050505050505050505056fea165627a7a723058209a237cea4f603e9ca5a80029c631ef3a5013935b169ba493441f2f290a79c8980029") as any;
    }
}
export var SeptaClassAbi = abi;