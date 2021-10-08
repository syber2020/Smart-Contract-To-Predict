pragma solidity 0.5.5;
contract PentaTestNew{
    int256 prior1;int256 prior2;int256 prior3;int256 prior4; int256 P0;int256 P1;int256 edenR;int256 enumR;
   int256 A0; int256 A1;int256 B0; int256 B1;int256 C0; int256 C1;int256 D0int256 D1;int256 Q;int256 R;
   int256 a;int256 b;int256 c;int256 d;int256 c1;int256 c2;int256 c3;int256 c4;int256 A;int256 B;int256 C;int256 D;
   int256 A2; int256 B2; int256 C2; int256 D2; int256 A3; int256 B3; int256 C3; int256 D3; int256 P2;int256 P3;int256 P4;int256 P5;
   int256 A4; int256 B4; int256 C4; int256 D4;int256 X1;int256 Y1;int256 X2;int256 Y2;int256 E; int256 F; int256 G; int256 H;
   int256 X01; int256 X23; int256 X45;int256 Y0;int256 A5;int256 B5; int256 C5; int256 D5;uint256[] divisor;

       int256 c5;
    int256 x;int256 y;
    function a_getparameters1
        (
        int256 x1,int256 x2, int256 x3,int256 x4,int256 x5,int256 v1,int256 v2, int256 v3,int256 v4,int256 v5,int256 m1,int256 m2, int256 m3,int256 m4, int256 m5
        ) public {
        A0 = 1;
        B0 = int256(v1*v2*v3*v4*v5);
        D0 = int256(v1*v2*v3*v4*v5);
        c1 = (x1-m1); c1=c1*c1;
        c2= (x2-m2); c2=c2*c2;  
        c3 = (x3-m3); c3=c3*c3; 
        c4 =(x4-m4);c4=c4*c4;
        c5 =(x5-m5);c5=c5*c5;
        C0 =int256(c1*v2*v3*v4*v5 + c2*v1*v3*v4*v5 + c3*v1*v2*v4*v5 + c4*v1*v2*v3*v5 + c5*v1*v2*v3*v4 );
    }

    function a_getparameters2
        (
        int256 x1,int256 x2, int256 x3,int256 x4,int256 x5,int256 v1,int256 v2, int256 v3,int256 v4,int256 v5,int256 m1,int256 m2, int256 m3,int256 m4, int256 m5
        ) public {
        A1 = 1;
        B1 = int256(v1*v2*v3*v4*v5);
        D1 = int256(v1*v2*v3*v4*v5);
        c1 = (x1-m1); c1=c1*c1;
        c2= (x2-m2); c2=c2*c2;  
        c3 = (x3-m3); c3=c3*c3; 
        c4 =(x4-m4);c4=c4*c4;
        c5 =(x5-m5);c5=c5*c5;
        C1 =int256(c1*v2*v3*v4*v5 + c2*v1*v3*v4*v5 + c3*v1*v2*v4*v5 + c4*v1*v2*v3*v5 + c5*v1*v2*v3*v4 );
    }
    function a_getparameters3
        (
        int256 x1,int256 x2, int256 x3,int256 x4,int256 x5,int256 v1,int256 v2, int256 v3,int256 v4,int256 v5,int256 m1,int256 m2, int256 m3,int256 m4, int256 m5
        ) public {
        A2 = 1;
        B2 = int256(v1*v2*v3*v4*v5);
        D2 = int256(v1*v2*v3*v4*v5);
        c1 = (x1-m1); c1=c1*c1;
        c2= (x2-m2); c2=c2*c2;  
        c3 = (x3-m3); c3=c3*c3; 
        c4 =(x4-m4);c4=c4*c4;
        c5 =(x5-m5);c5=c5*c5;
        C2 =int256(c1*v2*v3*v4*v5 + c2*v1*v3*v4*v5 + c3*v1*v2*v4*v5 + c4*v1*v2*v3*v5 + c5*v1*v2*v3*v4 );
    }
    function a_getparameters4
        (
        int256 x1,int256 x2, int256 x3,int256 x4,int256 x5,int256 v1,int256 v2, int256 v3,int256 v4,int256 v5,int256 m1,int256 m2, int256 m3,int256 m4, int256 m5
        ) public {
        A4 = 1;
        B4 = int256(v1*v2*v3*v4*v5);
        D4 = int256(v1*v2*v3*v4*v5);
        c1 = (x1-m1); c1=c1*c1;
        c2= (x2-m2); c2=c2*c2;  
        c3 = (x3-m3); c3=c3*c3; 
        c4 =(x4-m4);c4=c4*c4;
        c5 =(x5-m5);c5=c5*c5;
        C4 =int256(c1*v2*v3*v4*v5 + c2*v1*v3*v4*v5 + c3*v1*v2*v4*v5 + c4*v1*v2*v3*v5 + c5*v1*v2*v3*v4 );
    }
    function a_getparameters5
        (
        int256 x1,int256 x2, int256 x3,int256 x4,int256 x5,int256 v1,int256 v2, int256 v3,int256 v4,int256 v5,int256 m1,int256 m2, int256 m3,int256 m4, int256 m5
        ) public {
        A3 = 1;
        B3 = int256(v1*v2*v3*v4*v5);
        D3 = int256(v1*v2*v3*v4*v5);
        c1 = (x1-m1); c1=c1*c1;
        c2= (x2-m2); c2=c2*c2;  
        c3 = (x3-m3); c3=c3*c3; 
        c4 =(x4-m4);c4=c4*c4;
        c5 =(x5-m5);c5=c5*c5;
        C3 =int256(c1*v2*v3*v4*v5 + c2*v1*v3*v4*v5 + c3*v1*v2*v4*v5 + c4*v1*v2*v3*v5 + c5*v1*v2*v3*v4 );
    }
    function c_print256paramaters0() public view returns(int256,int256,int256,int256){
        return(A0,B0,C0,D0);
    }
    function d_print256paramaters1() public view returns(int256,int256,int256,int256){
        return(A1,B1,C1,D1);
    }
    function d_print256paramaters2() public view returns(int256,int256,int256,int256){
        return(A2,B2,C2,D2);
    }
    function d_print256paramaters3() public view returns(int256,int256,int256,int256){
        return(A3,B3,C3,D3);
    }
    function d_print256paramaters4() public view returns(int256,int256,int256,int256){
        return(A4,B4,C4,D4);
    }

    function print256_result()public view returns (int256,int256,int256,int256,int256){return (P0,P1,P2,P3,P4);}
    function gcd(int256 a, int256 b)public returns(int256){
    int256 z; int256 gcdint256;  uint256 max;
        if(a>b){z=b;} else {z=a;}
        for (int256 i=1;i<=z;i++){
            if(a%i==0&&b%i==0){ 
                gcdint256=i;
                divisor.push(uint256(gcdint256));
            }
        }
        
        for (uint256 i =0; i <divisor.length;i++){
            if(divisor[i]>max){ max=divisor[i];}
        }
        return (int256(max));
    } 
    
    function normalize() public{
        B0= B0/100000; B1= B1/100000; B2= B2/100000; B3= B3/100000;B4=B4/100000;
        C0= C0/100000; C1 = C1/100000; C2 = C2/100000; C3= C3/100000; C4= C4/100000;
        D0 =D0/100000; D1=D1/100000; D2= D2/100000; D3=D3/100000; D4=D4/100000;
        
    }
    function e_exponent(int256 e0, int256 e1, int256 f0, int256 f1, int256 g0, int256 g1, int256 h0, int256 h1, int256 Prior0,int256 Prior1)public {
        int256 div1; int256 div2;int256 div3;int256 div4;
        // div1 = gcd(g0,h0); g0=(g0/div1); h0=h0/div1;
        // div2 = gcd(g1,h1); g1=(g1/div1); h1=h1/div1;
        
        A = e0*f1;
        B = f0*e1;
        // div3=gcd(A,B); A = A/div3; B = B/div3;
        C = (g0*h1)-(g1*h0);
        D = h0*h1;
        // div4 = gcd(C,D); C = C/div4; D=D/div4;
        
        Q = int256(C/D);
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
    function test(int256 Prior0, int256 Prior1, int256 Prior2, int256 Prior3, int256 Prior4)public{
        e_exponent(A0,A1,B0,B1,C0,C1,D0,D1,Prior0, Prior1);
        if (Y0<Y1){P1=1000;P0=0;}else{P0=1000;P1=0;}
        e_exponent(A2,A3,B2,B3,C2,C3,D2,D3,Prior2, Prior3);
        if (Y0<Y1){P3=1000;P2=0;}else{P2=1000;P3=0;}

        if(P0>P1 && P2>P3){        // P0,P2{
            e_exponent(A0,A2,B0,B2,C0,C2,D0,D2,Prior0,Prior2);
            if(Y0>Y1){P2=0;
                e_exponent(A0,A4,B0,B4,C0,C4,D0,D4,Prior0,Prior4);
                P0=Y0; P4=Y1;}
            else{P0=0;
                e_exponent(A2,A4,B2,B4,C2,C4,D2,D4,Prior2, Prior4);
                P2=Y0; P4=Y1;}
        }
        else if(P0<P1 && P2>P3){   // P1,P2
            e_exponent(A1,A2,B1,B2,C1,C2,D1,D2,Prior1, Prior2);
            if(Y0>Y1){P2=0;
                e_exponent(A1,A4,B1,B4,C1,C4,D1,D4,Prior1,Prior4);
                P1=Y0; P4=Y1;}
            else{P1=0;
                e_exponent(A2,A4,B2,B4,C2,C4,D2,D4,Prior2, Prior4);
                P2=Y0; P4=Y1;}

        }
        else if(P0>P1 && P2<P3)  { // P0,P3
            e_exponent(A0,A3,B0,B3,C0,C3,D0,D3,Prior0, Prior3);
            if(Y0>Y1){P3=0;
                e_exponent(A0,A4,B0,B4,C0,C4,D0,D4,Prior0, Prior4);
                P0=Y0; P4=Y1;}
            else{P0=0;
                e_exponent(A3,A4,B3,B4,C3,C4,D3,D4,Prior3, Prior4);
                P3=Y0; P4=Y1;}
        }
        else
        {   // P1,P3
            e_exponent(A1,A3,B1,B3,C1,C3,D1,D3,Prior1, Prior3);
            if(Y0>Y1){P3=0;
                e_exponent(A1,A4,B1,B4,C1,C4,D1,D4,Prior1, Prior4);
                P1=Y0; P4=Y1;}
            else{P1=0;
                e_exponent(A3,A4,B3,B4,C3,C4,D3,D4,Prior3, Prior4);
                P3=Y0; P4=Y1;}
        }
    }

    function f_compare()public view returns(int256){
        int256 p0=0; int256 p1=1; int256 p2=2; int256 p3=3; int256 p4=4;
        if(P0>P1 && P0>P2 && P0>P3 && P0>P4)return(p0);
        else if (P1>P2 && P1>P0 && P1>P3 && P1>P4)return(p1);
        else if (P2>P0 && P2>P1 && P2>P3 && P2>P4)return(p2);
        else if (P3>P0 && P3>P1 && P3>P2 && P3>P4)return(p3);
        else return(p4);
    }
}
