pragma solidity ^0.4.23;

contract EventSync {
    event Event1(uint id);
    event Event2(uint id);

    uint public id1;
    uint public id2;

    function emitevent1(uint times) public {
        for (uint i = 0; i < times; i++) {
            emit Event1(id1);
            id1++;
        }
    }

    function emitevent2(uint times) public {
        for (uint i = 0; i < times; i++) {
            emit Event2(id2);
            id2++;
        }
    }

    function emitBoth() public {
        emit Event1(id1);
        id1++;
        emit Event2(id2);
        id2++;
    }
}
