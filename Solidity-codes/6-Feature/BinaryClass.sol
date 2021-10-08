pragma solidity 0.5.10;
contract BinaryClass{

    int prior1;int prior2;int prior3;int prior4; int P0;int P1;int edenR;int enumR;
    int A0; int A1;int B0; int B1;int C0; int C1;int D0; int D1;int Q;int R;
    int a;int b;int c;int d;int A;int B;int C;int D;
    int x;int y;
    
    
    int c10;int c20;int c30;int c40;int c50;int c60;
    int c11;int c21;int c31;int c41;int c51;int c61;
    int V10; int V20; int V30; int V40; int V50; int V60;
    int V11; int V21; int V31; int V41; int V51; int V61;
    
    function variance0
        (
        int v1,int v2, int v3,int v4,int v5,int v6
        )public{
        B0 = v1*v2*v3*v4*v5*v6;
        D0 = B0;
        
    }
     function variance1
        (
        int v1,int v2, int v3,int v4,int v5,int v6
        )public{
        B1 = v1*v2*v3*v4*v5*v6;
        D1 = B1;
    }
     

    function c_getparameters1
        (
        int x1,int x2, int x3,int x4,int x5,int x6,int m1,int m2, int m3,int m4, int m5, int m6
        ) public {
        c10 = (x1-m1);c10=c10*c10;
        c20 = (x2-m2); c20=c20*c20;  
        c30 = (x3-m3);c30=c30*c30; 
        c40 = (x4-m4); c40=c40*c40;
        c50 = (x5-m5); c50=c50*c50;
        c60 = (x6-m6);c60=c60*c60;
    }
    
     function c_getparameters2
        (
        int x1,int x2, int x3,int x4,int x5,int x6,int m1,int m2, int m3,int m4, int m5, int m6
        ) public {
        A1 = 1;
        c11 = (x1-m1); c11=c11*c11;
        c21= (x2-m2); c21=c21*c21;  
        c31 = (x3-m3);c31=c31*c31; 
        c41 =(x4-m4);c41=c41*c41;
        c51 =(x5-m5);c51=c51*c51;
        c61 = (x6-m6);c61=c61*c61;
       // C1 =int(c1*v2*v3*v4*v5*v6 + c2*v1*v3*v4*v5*v6 + c3*v1*v2*v4*v5*v6 + c4*v1*v2*v3*v5*v6 + c5*v1*v2*v3*v4*v6 + c6*v1*v2*v3*v4*v6  );
    }
     function v1_multiply(int v1,int v2,int v3,int v4,int v5, int v6) public {
         V10 = c10*v2*v3*v4*v5*v6;
         V20 = v1*c20*v3*v4*v5*v6;
         V30 = v1*v2*c30*v4*v5*v6;
         V40 = v1*v2*v3*c40*v5*v6;
         V50 = v1*v2*v3*v4*c50*v6;
         V60 = v1*v2*v3*v4*v5*c60;
         
     }
     function v2_multiply(int v1,int v2,int v3,int v4,int v5, int v6) public {
         V10 = c11*v2*v3*v4*v5*v6;
         V20 = v1*c21*v3*v4*v5*v6;
         V30 = v1*v2*c31*v4*v5*v6;
         V40 = v1*v2*v3*c41*v5*v6;
         V50 = v1*v2*v3*v4*c51*v6;
         V60 = v1*v2*v3*v4*v5*c61;
         
     }
     function C_get(
        ) public {
         C1 =V10+V20+V30+V40+V50+V60;
         C1 =V11+V21+V31+V41+V51+V61;
         //+ c2*v1*v3*v4*v5*v6 + c3*v1*v2*v4*v5*v6 + c4*v1*v2*v3*v5*v6 + c5*v1*v2*v3*v4*v6 + c6*v1*v2*v3*v4*v6  );  
    }
    // function c_printparamaters1() public view returns(int,int,int,int){
    //     return(A0,B0,C0,D0);
    // }
    // function d_printparamaters2() public view returns(int,int,int,int){
    //     return(A1,B1,C1,D1);
    // }
    function e_exponent(int Prior0,int Prior1)public {
        //int x1=1; int x2=2;
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
        }else{
            P0 = A*1000*edenR*Prior0*Prior0;
            P1 = B*1*enumR*Prior1*Prior1;
        }
    }
    // function g1_print_output_QR_P0P1()public view returns(int,int,int,int){return(Q,R,P0,P1);}
    // function g2_print_output_ABCD()public view returns(int,int,int,int){return(A,B,C,D);}
    //function g3_print_output_EDENENUMR()public view returns(int,int){return(edenR,enumR);}
    function f_compare()public view returns(int){
        int p0=0; int p1=1;
        if(P0 > P1)return(p0);
        else return(p1);
    }
}
