import BN from "bn.js";
import { Address } from "web3x-es/address";
import { EventLog, TransactionReceipt } from "web3x-es/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x-es/contract";
import { Eth } from "web3x-es/eth";
import abi from "./MigrationsAbi";
interface MigrationsEvents {
}
interface MigrationsEventLogs {
}
interface MigrationsTxEventLogs {
}
export interface MigrationsTransactionReceipt extends TransactionReceipt<MigrationsTxEventLogs> {
}
interface MigrationsMethods {
    last_completed_migration(): TxCall<string>;
    owner(): TxCall<Address>;
    setCompleted(completed: number | string | BN): TxSend<MigrationsTransactionReceipt>;
    upgrade(new_address: Address): TxSend<MigrationsTransactionReceipt>;
}
export interface MigrationsDefinition {
    methods: MigrationsMethods;
    events: MigrationsEvents;
    eventLogs: MigrationsEventLogs;
}
export class Migrations extends Contract<MigrationsDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
    deploy(): TxSend<MigrationsTransactionReceipt> {
        return super.deployBytecode("0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102ae806100606000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630900f01014610051578063445df0ac146100955780638da5cb5b146100b3578063fdacd576146100fd575b600080fd5b6100936004803603602081101561006757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061012b565b005b61009d6101f7565b6040518082815260200191505060405180910390f35b6100bb6101fd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101296004803603602081101561011357600080fd5b8101908080359060200190929190505050610222565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101f45760008190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b1580156101da57600080fd5b505af11580156101ee573d6000803e3d6000fd5b50505050505b50565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561027f57806001819055505b5056fea165627a7a723058201c912d9ef4ded0a8ce4b13b5785c0e3187efbe80ba6586c91486808a02c5125e0029") as any;
    }
}
export var MigrationsAbi = abi;
