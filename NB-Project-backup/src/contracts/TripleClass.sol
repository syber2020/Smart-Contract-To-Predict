pragma solidity 0.5.5;
contract TripleClass{

    int prior1;int prior2;int prior3;int prior4; int P0;int P1;int edenR;int enumR;
    int A0; int A1;int B0; int B1;int C0; int C1;int D0; int D1;int Q;int R;
    int a;int b;int c;int d;int c1;int c2;int c3;int c4;int A;int B;int C;int D;
    int A2; int B2; int C2; int D2; int A3; int B3; int C3; int D3; int P2;

    int x;int y;
    function a_getparameters1
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

    function b_getparameters2(
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
    function b_getparameters3(
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
    function c_printparamaters1() public view returns(int,int,int,int){
        return(A0,B0,C0,D0);
    }
    function d_printparamaters2() public view returns(int,int,int,int){
        return(A1,B1,C1,D1);
    }
    function d_printparamaters3() public view returns(int,int,int,int){
        return(A2,B2,C2,D2);
    }
    function e_exponent1(int Prior0,int Prior1,int Prior2)public {
        A = A0*B1;
        B = B0*A1;
        C = (C0*D1)-(C1*D0);
        D = D0*D1;
        Q = int(C/D);
        R = C%D;
        //int Enum=19;
        //int Eden=7;
        edenR = 24*(D*D*D*D);
        enumR = 24*D*D*D*D+ R*24*D*D*D+R*R*12*D*D+R*R*R*4*D+R*R*R*R;
        if(Q>=0){
            P0 = A*1*edenR*Prior0*Prior0;
            P1 = B*1000*enumR*Prior1*Prior1;
            if(P0>P1){
                P1=0;
                A = A0*B2;
                B = B0*A2;
                C = (C0*D2)-(C2*D0);
                D = D0*D2;
                Q = int(C/D);
                R = C%D;
                if(Q>=0){
                    P0 = A*1*edenR*Prior0*Prior0;
                    P2 = B*1000*enumR*Prior2*Prior2;
                }else{
                    P0 = A*1000*edenR*Prior0*Prior0;
                    P2 = B*1*enumR*Prior2*Prior2;
                }
            }else{
                P0=0;
                A = A1*B2;
                B = B1*A2;
                C = (C1*D2)-(C2*D1);
                D = D2*D1;
                Q = int(C/D);
                R = C%D;
                if(Q>=0){
                    P1 = A*1*edenR*Prior1*Prior1;
                    P2 = B*1000*enumR*Prior2*Prior2;
                }else{
                    P1 = A*1000*edenR*Prior1*Prior1;
                    P2 = B*1*enumR*Prior2*Prior2;
                }
            }
        }else{
            P0 = A*1000*edenR*Prior0*Prior0;
            P1 = B*1*enumR*Prior1*Prior1;
            if(P0>P1){
                P1=0;
                A = A0*B2;
                B = B0*A2;
                C = (C0*D2)-(C2*D0);
                D = D0*D2;
                Q = int(C/D);
                R = C%D;
                if(Q>=0){
                    P0 = A*1*edenR*Prior0*Prior0;
                    P2 = B*1000*enumR*Prior2*Prior2;
                }else{
                    P0 = A*1000*edenR*Prior0*Prior0;
                    P2 = B*1*enumR*Prior2*Prior2;
                }
            }else{
                P0=0;
                A = A1*B2;
                B = B1*A2;
                C = (C1*D2)-(C2*D1);
                D = D2*D1;
                Q = int(C/D);
                R = C%D;
                if(Q>=0){
                    P1 = A*1*edenR*Prior1*Prior1;
                    P2 = B*1000*enumR*Prior2*Prior2;
                }else{
                    P1 = A*1000*edenR*Prior1*Prior1;
                    P2 = B*1*enumR*Prior2*Prior2;
                }
            }
        }
    }

    // function g1_print_output_QR_P0P1()public view returns(int,int,int,int){return(Q,R,P0,P1);}
    // function g2_print_output_ABCD()public view returns(int,int,int,int){return(A,B,C,D);}
    //function g3_print_output_EDENENUMR()public view returns(int,int){return(edenR,enumR);}
    function f_compare()public view returns(int){
        int p0=0; int p1=1; int p2=2;
        if(P0 > P1 && P0 >P2)return(p0);
        else if (P1 > P2 && P1 >P0)return(p1);
        else return(p2);
    }
}
