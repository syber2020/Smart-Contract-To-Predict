pragma solidity 0.5.5;
// for 4 feature and Hexa class
contract HexaClass{

     int prior1;int prior2;int prior3;int prior4; int P0;int P1;int edenR;int enumR;
    int A0; int A1;int B0; int B1;int C0; int C1;int D0; int D1;int Q;int R;
    int a;int b;int c;int d;int c1;int c2;int c3;int c4;int A;int B;int C;int D;
    int A2; int B2; int C2; int D2; int A3; int B3; int C3; int D3; int P2;int P3;int P4;int P5;
    int A4; int B4; int C4; int D4;int X1;int Y1;int X2;int Y2;int E; int F; int G; int H;
    int X01; int X23; int X45;int Y0;int A5;int B5; int C5; int D5;
    function a_getparameters0
        (
        int x1,int x2, int x3,int x4,int v1,int v2, int v3,int v4,int m1,int m2, int m3,int m4
        ) public {
        A0 = 1;
        B0 = int(v1*v2*v3*v4);
        D0 = int(v1*v2*v3*v4);
        c1 = (x1-m1)*(x1-m1);
        c2= (x2-m2)*(x2-m2);
        c3 = (x3-m3)*(x3-m3);
        c4 =(x4-m4)*(x4-m4);
        C0 =int(c1*v2*v3*v4 + c2*v1*v3*v4 + c3*v1*v2*v4 + c4*v1*v2*v3);
    }

    function b_getparameters1(
        int x1,int x2, int x3,int x4,int v1,int v2, int v3,int v4,int m1,int m2, int m3,int m4
        )
        public {
        A1 = 1;
        B1 = v1*v2*v3*v4;
        D1 = v1*v2*v3*v4;
        c1 = (x1-m1)*(x1-m1);
        c2= (x2-m2)*(x2-m2);
        c3 = (x3-m3)*(x3-m3);
        c4 =(x4-m4)*(x4-m4);
        C1 = c1*v2*v3*v4 + c2*v1*v3*v4 + c3*v1*v2*v4 + c4*v1*v2*v3;
    }
    function b_getparameters2(
        int x1,int x2, int x3,int x4,int v1,int v2, int v3,int v4,int m1,int m2, int m3,int m4
        )
        public {
        A2 = 1;
        B2 = v1*v2*v3*v4;
        D2 = v1*v2*v3*v4;
        c1 = (x1-m1)*(x1-m1);
        c2= (x2-m2)*(x2-m2);
        c3 = (x3-m3)*(x3-m3);
        c4 =(x4-m4)*(x4-m4);
        C2 = c1*v2*v3*v4 + c2*v1*v3*v4 + c3*v1*v2*v4 + c4*v1*v2*v3;
    }
    function b_getparameters3(
        int x1,int x2, int x3,int x4,int v1,int v2, int v3,int v4,int m1,int m2, int m3,int m4
        )
        public {
        A3 = 1;
        B3 = v1*v2*v3*v4;
        D3 = v1*v2*v3*v4;
        c1 = (x1-m1)*(x1-m1);
        c2= (x2-m2)*(x2-m2);
        c3 = (x3-m3)*(x3-m3);
        c4 =(x4-m4)*(x4-m4);
        C3 = c1*v2*v3*v4 + c2*v1*v3*v4 + c3*v1*v2*v4 + c4*v1*v2*v3;
    }
    function b_getparameters4(
        int x1,int x2, int x3,int x4,int v1,int v2, int v3,int v4,int m1,int m2, int m3,int m4
        )
        public {
        A4 = 1;
        B4 = v1*v2*v3*v4;
        D4 = v1*v2*v3*v4;
        c1 = (x1-m1)*(x1-m1);
        c2= (x2-m2)*(x2-m2);
        c3 = (x3-m3)*(x3-m3);
        c4 =(x4-m4)*(x4-m4);
        C4 = c1*v2*v3*v4 + c2*v1*v3*v4 + c3*v1*v2*v4 + c4*v1*v2*v3;
    }
    function b_getparameters5(
        int x1,int x2, int x3,int x4,int v1,int v2, int v3,int v4,int m1,int m2, int m3,int m4
        )
        public {
        A5 = 1;
        B5 = v1*v2*v3*v4;
        D5 = v1*v2*v3*v4;
        c1 = (x1-m1)*(x1-m1);
        c2= (x2-m2)*(x2-m2);
        c3 = (x3-m3)*(x3-m3);
        c4 =(x4-m4)*(x4-m4);
        C5 = c1*v2*v3*v4 + c2*v1*v3*v4 + c3*v1*v2*v4 + c4*v1*v2*v3;
    }
    function c_printparamaters0() public view returns(int,int,int,int){
        return(A0,B0,C0,D0);
    }
    function d_printparamaters1() public view returns(int,int,int,int){
        return(A1,B1,C1,D1);
    }
    function c_printparamaters2() public view returns(int,int,int,int){
        return(A2,B2,C2,D2);
    }
    function d_printparamaters3() public view returns(int,int,int,int){
        return(A3,B3,C3,D3);
    }
    function c_printparamaters4() public view returns(int,int,int,int){
        return(A4,B4,C4,D4);
    }
    function d_printparamaters5() public view returns(int,int,int,int){
        return(A5,B5,C5,D5);
    }
    function e_exponent(int e0, int e1, int f0, int f1, int g0, int g1, int h0, int h1, int Prior0,int Prior1)public {
        A = e0*f1;
        B = f0*e1;
        C = (g0*h1)-(g1*h0);
        D = h0*h1;
        Q = int(C/D);
        R = C%D;
        edenR = 24*(D*D*D*D);
        enumR = 24*D*D*D*D+ R*24*D*D*D+R*R*12*D*D+R*R*R*4*D+R*R*R*R;
        if(Q>=0){
            Y0 = A*1*edenR*Prior0*Prior0;
            Y1 = B*1000*enumR*Prior1*Prior1;
        }else{
            Y0 = A*1000*edenR*Prior0*Prior0;
            Y1 = B*1*enumR*Prior1*Prior1;
        }

    }
    function test(int Prior0, int Prior1, int Prior2, int Prior3, int Prior4, int Prior5)public{
        e_exponent(A0,A1,B0,B1,C0,C1,D0,D1,Prior0, Prior1);
        if (Y0<Y1){P1=1000;P0=0;}else{P0=1000;P1=0;}
        e_exponent(A2,A3,B2,B3,C2,C3,D2,D3,Prior2, Prior3);
        if (Y0<Y1){P3=1000;P2=0;}else{P2=1000;P3=0;}
        e_exponent(A4,A5,B4,B5,C4,C5,D4,D5,Prior4, Prior5);
        if (Y0<Y1){P5=1000;P4=0;}else{P4=1000;P5=0;}
        if(P0>P1 && P2>P3 && P4>P5){        // P0,P2,P4{
            e_exponent(A0,A2,B0,B2,C0,C2,D0,D2,Prior0, Prior2);
            if(Y0>Y1){P2=0;  //compare P0 and P4
                e_exponent(A0,A4,B0,B4,C0,C4,D0,D4,Prior0, Prior4);
                P0=Y0; P4=Y1;}
            else{P0=0;
                e_exponent(A2,A4,B2,B4,C2,C4,D2,D4,Prior2, Prior4);
                P2=Y0; P4=Y1;}
        }
        else if(P0>P1 && P2>P3 && P5>P4){   // P0,P2,P5
            e_exponent(A0,A2,B0,B2,C0,C2,D0,D2,Prior0, Prior2);
            if(Y0>Y1){P2=0;  //compare P0 and P4
                e_exponent(A0,A5,B0,B5,C0,C5,D0,D5,Prior0, Prior5);
                P0=Y0; P5=Y1;}
            else{P0=0;
                e_exponent(A2,A5,B2,B5,C2,C5,D2,D5,Prior2, Prior5);
                P2=Y0; P5=Y1;}
        }
        else if(P0>P1 && P3>P2 && P4>P5)  { // P0,P3,P4
            e_exponent(A0,A3,B0,B3,C0,C3,D0,D3,Prior0, Prior3);
            if(Y0>Y1){P3=0;  //compare P0 and P4
                e_exponent(A0,A4,B0,B4,C0,C4,D0,D4,Prior0, Prior4);
                P0=Y0; P4=Y1;}
            else{P0=0;
                e_exponent(A3,A4,B3,B4,C3,C4,D3,D4,Prior3, Prior4);
                P3=Y0; P4=Y1;}
        }
        else if(P0>P1 && P3>P2 && P5>P4){   // P0,P3,P5
            e_exponent(A0,A3,B0,B3,C0,C3,D0,D3,Prior0, Prior3);
            if(Y0>Y1){P3=0;  //compare P0 and P4
                e_exponent(A0,A3,B0,B3,C0,C3,D0,D3,Prior0, Prior3);
                P0=Y0; P3=Y1;}
            else{P0=0;
                e_exponent(A3,A5,B3,B5,C3,C5,D3,D5,Prior3, Prior5);
                P3=Y0; P5=Y1;}
        }
        else if(P1>P0 && P2>P3 && P4>P5){   // P1,P2,P4
            e_exponent(A1,A2,B1,B2,C1,C2,D1,D2,Prior1, Prior2);
            if(Y0>Y1){P2=0;  //compare P1 and P4
                e_exponent(A1,A4,B1,B4,C1,C4,D1,D4,Prior1, Prior4);
                P1=Y0; P4=Y1;}
            else{P1=0;
                e_exponent(A2,A4,B2,B4,C2,C4,D2,D4,Prior2, Prior4);
                P2=Y0; P4=Y1;}
        }
        else if(P1>P0 && P2>P3 && P5>P4){   // P1,P2,P5
            e_exponent(A1,A2,B1,B2,C1,C2,D1,D2,Prior1, Prior2);
            if(Y0>Y1){P2=0;  //compare P1 and P5
                e_exponent(A1,A5,B1,B5,C1,C5,D1,D5,Prior1, Prior5);
                P1=Y0; P5=Y1;}
            else{P1=0;
                e_exponent(A2,A5,B2,B5,C2,C5,D2,D5,Prior2, Prior5);
                P2=Y0; P5=Y1;}
        }
        else if(P1>P0 && P3>P2 && P4>P5){   // P1,P3,P4
            e_exponent(A1,A3,B1,B3,C1,C3,D1,D3,Prior1, Prior3);
            if(Y0>Y1){P3=0;  //compare P1 and P4
                e_exponent(A1,A4,B1,B4,C1,C4,D1,D4,Prior1, Prior4);
                P1=Y0; P4=Y1;}
            else{P1=0;
                e_exponent(A3,A4,B3,B4,C3,C4,D3,D4,Prior3, Prior4);
                P3=Y0; P4=Y1;}
        }
        else{    // P1,P3,P5
            e_exponent(A1,A3,B1,B3,C1,C3,D1,D3,Prior1, Prior3);
            if(Y0>Y1){P3=0;  //compare P1 and P5
                e_exponent(A1,A5,B1,B5,C1,C5,D1,D5,Prior1, Prior5);
                P1=Y0; P5=Y1;}
            else{P1=0;
                e_exponent(A3,A5,B3,B5,C3,C5,D3,D5,Prior3, Prior5);
                P3=Y0; P5=Y1;}
        }
    }
    function printall() public view returns(int,int,int,int,int,int){ return(P0,P1,P2,P3,P4,P5);}
    function f_compare()public view returns(int){
        int p0=0; int p1=1; int p2=2; int p3=3; int p4=4;int p5=5;
        if(P0>P1 && P0>P2 && P0>P3 && P0>P4 && P0>P5)return(p0);
        else if (P1>P2 && P1>P0 && P1>P3 && P1>P4 && P1>P5)return(p1);
        else if (P2>P0 && P2>P1 && P2>P3 && P2>P4 && P2>P5)return(p2);
        else if (P3>P0 && P3>P1 && P3>P2 && P3>P4 && P3>P5)return(p3);
        else if (P4>P0 && P4>P1 && P4>P2 && P4>P3 && P4>P5)return(p4);
        else return(p5);
    }
}