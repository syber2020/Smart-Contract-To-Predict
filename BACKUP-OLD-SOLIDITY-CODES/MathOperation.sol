pragma solidity 0.5.5;
contract MathOperation{
    uint a; uint b; uint addition;
    uint subtraction; uint multiplication;
    function getnumbers(uint c, uint d) public{
        a = c;
        b = d;
    }
    function add()public{
        addition = a+b;
    }
    function Subtract() public{
        subtraction = a-b;
    }
    function multiply() public{
        multiplication=a*b;
    }
    function printadd()public view returns(uint){
        return(addition);
    }
    function printsubtract()public view returns(uint){
        return(subtraction);
    }
    function printmultiply()public view returns(uint){
        return(multiplication);
    }


}
