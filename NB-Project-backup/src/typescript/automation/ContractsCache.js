"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("web3x-es/address");
var eth_1 = require("web3x-es/eth");
var networks_json_1 = __importDefault(require("../../networks.json"));
var Networks = networks_json_1.default || {};
// @ts-ignore
// tslint:disable-next-line
function ensurePermissions(props) {
    return Promise.resolve();
}
var ContractCache = /** @class */ (function () {
    function ContractCache(name, creator) {
        /**
         * Stores the cached instances of the contracts
         */
        this.contractsCache = {};
        this.addressCache = [];
        this.contractName = name;
        this.contractCreator = creator;
    }
    /**
     * Gets or creates a new instance of this class
     * @param name the name of the contract
     * @param creator the creator function if new instances need to be made
     */
    ContractCache.getInstance = function (name, creator) {
        if (ContractCache.constructedInstances[name]) {
            return ContractCache.constructedInstances[name];
        }
        var constructedInstance = new ContractCache(name, creator);
        ContractCache.constructedInstances[name] = constructedInstance;
        return constructedInstance;
    };
    ContractCache.setProps = function (_props) {
        if (!_props) {
            return;
        }
        if (ContractCache.props) {
            if (ContractCache.props.ethereumProvider === _props.ethereumProvider) {
                return;
            }
        }
        // new provider: change props
        ContractCache.props = _props;
        ContractCache.eth = new eth_1.Eth(_props.ethereumRequestManager);
        // clear all cached contract instances.
        for (var _i = 0, _a = Object.keys(ContractCache.constructedInstances); _i < _a.length; _i++) {
            var key = _a[_i];
            ContractCache.constructedInstances[key].clearCache();
        }
    };
    ContractCache.prototype.getSendingAddress = function (runAsAddressIndex) {
        var _this = this;
        if (!ContractCache.eth) {
            return Promise.reject(new Error("No Eth instance to give addrs for " + this.contractName));
        }
        var theAddressIndex;
        return Promise.resolve().then(function () {
            if (runAsAddressIndex) {
                theAddressIndex = parseInt(runAsAddressIndex, 10);
            }
            else {
                theAddressIndex = 0;
            }
            return Promise.resolve();
        }).then(function () {
            if (_this.addressCache && _this.addressCache.length) {
                return Promise.resolve(_this.addressCache);
            }
            else {
                return ensurePermissions(ContractCache.props).then(function () {
                    return ContractCache.eth.getAccounts();
                });
            }
        }).then(function (accounts) {
            if (!accounts) {
                return Promise.reject(new Error("Eth instance haz no accts for " + _this.contractName));
            }
            _this.addressCache = accounts;
            if (theAddressIndex < 0) {
                return address_1.Address.ZERO;
            }
            else if (theAddressIndex > accounts.length) {
                return Promise.reject("Eth instance accounts length " + accounts.length + " haz no accounts for idx " + theAddressIndex);
            }
            else {
                return Promise.resolve(accounts[theAddressIndex]);
            }
        });
    };
    ContractCache.prototype.getOrCreateContractForCurrentNetwork = function (deployNewIfNoneExists) {
        var _this = this;
        if (deployNewIfNoneExists === void 0) { deployNewIfNoneExists = false; }
        return Promise.resolve().then(function () {
            if (!ContractCache.eth) {
                return Promise.reject(new Error('Ethereum instance not created'));
            }
            return ContractCache.eth.getId();
        }).then(function (networkID) {
            if (_this.contractsCache[networkID]) {
                return Promise.resolve(_this.contractsCache[networkID]);
            }
            else {
                return _this.findContractForNetwork(networkID, deployNewIfNoneExists).then(function (inst) {
                    return Promise.resolve(inst);
                });
            }
        });
    };
    ContractCache.prototype.createContractForNetwork = function (networkID, deployNewIfNoneExists) {
        var _this = this;
        if (!deployNewIfNoneExists) {
            return Promise.reject(this.contractName + " DNE on network " + networkID);
        }
        return this.getSendingAddress().then(function (addr) {
            return _this.contractCreator(ContractCache.eth).then(function (inst) {
                return inst.deploy().send({ from: addr }).getReceipt().then(function () {
                    return Promise.resolve(inst);
                });
            });
        }).then(function (inst) {
            _this.addAddressToCache(networkID, inst.address);
            return Promise.resolve(inst);
        });
    };
    ContractCache.prototype.addAddressToCache = function (networkID, contractAddress) {
        var networkIDStr = networkID.toString();
        // get the info for all contracts
        var allContractsInfo = Networks && Networks.contracts;
        if (!allContractsInfo) {
            // @ts-ignore
            Networks.contracts = {};
            allContractsInfo = Networks.contracts;
        }
        // get the info for this contract
        // @ts-ignore
        var thisContractInfo = allContractsInfo[this.contractName];
        if (!thisContractInfo) {
            // @ts-ignore
            allContractsInfo[this.contractName] = {};
            // @ts-ignore
            thisContractInfo = allContractsInfo[this.contractName];
        }
        // get the info for all networks this contract is deployed on
        var networkSpecificContractInfo = thisContractInfo.networks;
        if (!networkSpecificContractInfo) {
            thisContractInfo.networks = {};
            networkSpecificContractInfo = thisContractInfo.networks;
        }
        // get the info for this network
        var contractInfoForThisNetwork = networkSpecificContractInfo[networkIDStr];
        if (!contractInfoForThisNetwork) {
            networkSpecificContractInfo[networkIDStr] = {};
            contractInfoForThisNetwork = networkSpecificContractInfo[networkIDStr];
        }
        // set the address
        contractInfoForThisNetwork.address = contractAddress;
    };
    ContractCache.prototype.addContractToState = function (networkID, contract) {
        this.contractsCache[networkID] = contract;
    };
    ContractCache.prototype.findContractForNetwork = function (networkID, deployNewIfNoneExists) {
        var _this = this;
        var networkIDStr = networkID.toString();
        // Part 0: All info for the contracts
        var allContractInfo = Networks && Networks.contracts;
        if (!allContractInfo) {
            return this.createContractForNetwork(networkID, deployNewIfNoneExists).then(function (contract) {
                _this.addContractToState(networkID, contract);
                return Promise.resolve(contract);
            });
        }
        // Part 1: Entry in the JSON file for the contract?
        // @ts-ignore
        var contractInfo = allContractInfo[this.contractName];
        if (!contractInfo) {
            return this.createContractForNetwork(networkID, deployNewIfNoneExists).then(function (contract) {
                _this.addContractToState(networkID, contract);
                return Promise.resolve(contract);
            });
        }
        // Part 2: Entry in that part of the JSON file for all networkIDs
        var networkSpecificContractInfo = contractInfo && contractInfo.networks;
        if (!networkSpecificContractInfo) {
            return this.createContractForNetwork(networkID, deployNewIfNoneExists).then(function (contract) {
                _this.addContractToState(networkID, contract);
                return Promise.resolve(contract);
            });
        }
        // Part 3: Entry in that part of the JSON file for the current network
        var contractInfoForThisNetwork = networkSpecificContractInfo[networkIDStr];
        if (!contractInfoForThisNetwork) {
            return this.createContractForNetwork(networkID, deployNewIfNoneExists).then(function (contract) {
                _this.addContractToState(networkID, contract);
                return Promise.resolve(contract);
            });
        }
        // Part 4: Address for that contractID?
        var contractAddress = contractInfoForThisNetwork.address;
        if (!contractAddress) {
            return this.createContractForNetwork(networkID, deployNewIfNoneExists).then(function (contract) {
                _this.addContractToState(networkID, contract);
                return Promise.resolve(contract);
            });
        }
        // Part 5: Create instance wrapping already-deployed contract
        return this.contractCreator(ContractCache.eth, contractAddress).then(function (contract) {
            _this.addContractToState(networkID, contract);
            return Promise.resolve(contract);
        });
    };
    ContractCache.prototype.clearCache = function () {
        this.contractsCache = {};
    };
    /**
     * A cache of the constructed instances of this class
     */
    ContractCache.constructedInstances = {};
    return ContractCache;
}());
exports.ContractCache = ContractCache;
