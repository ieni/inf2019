 /* 3x3 LEVEL 1
    Dit is een oefenvoorbeeld. Level 1 begint altijd met dit voorbeeld.
*/

O3_level1 = new Array(
    new Array(  0,0,0,
                2,1,0,
                2,1,0)
);

 /* 3x3 LEVEL 2
    Level 2 bevat vier puzzels.
    Het spel kiest in LEVEL 2 random één van deze vier puzzels.
*/

O3_level2 = new Array(
    new Array(  1,1,1,
                1,0,1,
                1,1,1),
    new Array(  0,0,0,
                2,0,1,
                2,1,2),     
    new Array(  1,0,0,
                1,1,0,
                0,1,1),
    new Array(  1,3,1,
                0,3,0,
                0,3,0)
);  

// 3x3 LEVEL 3

O3_level3 = new Array(
    new Array(  0,1,1,
                2,2,0,
                1,1,0),
    new Array(  1,3,3,
                2,1,1,
                2,2,1),
    new Array(  0,0,0,
                2,3,2,
                1,1,1),     
    new Array(  1,0,0,
                2,1,0,
                2,1,0),
    new Array(  2,3,3,
                2,3,5,
                2,3,3)
);

// 3x3 LEVEL 4

O3_level4 = new Array(
    new Array(  1,1,1,
                3,3,2,
                0,0,0),
    new Array(  2,2,2,
                1,1,1,
                4,4,0),
    new Array(  1,2,1,
                2,4,2,
                1,2,1),
    new Array(  1,0,1,
                4,3,2,
                1,1,0)                                        
);

// 3x3 LEVEL 5

O3_level5 = new Array(
    new Array(  1,5,2,
                1,5,2,
                0,1,1),
    new Array(  2,3,0,
                3,5,1,
                2,3,0),
    new Array(  3,3,2,
                3,4,3,
                2,5,4),
    new Array(  2,2,1,
                3,4,3,
                2,2,1)                                        
);  


 /* 4x4 LEVEL 1
    Dit is een oefenvoorbeeld. Level 1 begint altijd met dit voorbeeld.
    Je kunt LEVEL 1 ook gebruiken om nieuwe opgaven uit te proberen.
*/


O4_level1 = new Array(
    new Array( 1,1,0,0,
               0,1,1,1,
               0,0,1,1,
               1,1,1,0)
            );

// 4x4 LEVEL 2

O4_level2 = new Array(
    new Array( 2,2,0,0,
               0,2,2,1,
               0,0,2,1,
               1,2,2,0),
    new Array( 2,2,0,0,
               0,2,2,1,
               0,0,2,1,
               1,2,2,0)
            );

// 4x4 LEVEL 3

O4_level3 = new Array(
    new Array( 2,3,0,0,
               0,2,2,1,
               0,0,2,1,
               1,2,2,0),
    new Array( 2,3,0,0,
               0,2,2,1,
               0,0,2,1,
               1,2,2,0)
            );

// 4x4 LEVEL 4

O4_level4 = new Array(
    new Array( 2,4,0,0,
               1,3,2,1,
               1,0,2,1,
               1,2,2,0),
    new Array( 2,4,0,0,
               1,3,2,1,
               1,0,2,1,
               1,2,2,0)
            ); 

// 4x4 LEVEL 5

O4_level5 = new Array(
    new Array( 2,3,0,0,
               0,3,3,3,
               0,0,2,1,
               1,2,2,0),
    new Array( 2,3,0,0,
               0,3,3,3,
               0,0,2,1,
               1,2,2,0)
            ); 


O3 = new Array(O3_level1,O3_level2,O3_level3,O3_level4,O3_level5);
O4 = new Array(O4_level1,O4_level2,O4_level3,O4_level4,O4_level5);