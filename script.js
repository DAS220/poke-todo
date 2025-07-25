// --- 상수 및 전역 변수 ---
const POKEMON_DATA = [{id:1,name:"이상해씨",gen:1,rarity:"Common"},{id:2,name:"이상해풀",gen:1,rarity:"Common"},{id:3,name:"이상해꽃",gen:1,rarity:"Rare"},{id:4,name:"파이리",gen:1,rarity:"Common"},{id:5,name:"리자드",gen:1,rarity:"Common"},{id:6,name:"리자몽",gen:1,rarity:"Rare"},{id:7,name:"꼬부기",gen:1,rarity:"Common"},{id:8,name:"어니부기",gen:1,rarity:"Common"},{id:9,name:"거북왕",gen:1,rarity:"Rare"},{id:10,name:"캐터피",gen:1,rarity:"Common"},{id:11,name:"단데기",gen:1,rarity:"Common"},{id:12,name:"버터플",gen:1,rarity:"Common"},{id:13,name:"뿔충이",gen:1,rarity:"Common"},{id:14,name:"딱충이",gen:1,rarity:"Common"},{id:15,name:"독침붕",gen:1,rarity:"Common"},{id:16,name:"구구",gen:1,rarity:"Common"},{id:17,name:"피죤",gen:1,rarity:"Common"},{id:18,name:"피죤투",gen:1,rarity:"Rare"},{id:19,name:"꼬렛",gen:1,rarity:"Common"},{id:20,name:"레트라",gen:1,rarity:"Common"},{id:21,name:"깨비참",gen:1,rarity:"Common"},{id:22,name:"깨비드릴조",gen:1,rarity:"Common"},{id:23,name:"아보",gen:1,rarity:"Common"},{id:24,name:"아보크",gen:1,rarity:"Common"},{id:25,name:"피카츄",gen:1,rarity:"Rare"},{id:26,name:"라이츄",gen:1,rarity:"Rare"},{id:27,name:"모래두지",gen:1,rarity:"Common"},{id:28,name:"고지",gen:1,rarity:"Common"},{id:29,name:"니드런♀",gen:1,rarity:"Common"},{id:30,name:"니드리나",gen:1,rarity:"Common"},{id:31,name:"니드퀸",gen:1,rarity:"Rare"},{id:32,name:"니드런♂",gen:1,rarity:"Common"},{id:33,name:"니드라노",gen:1,rarity:"Common"},{id:34,name:"니드킹",gen:1,rarity:"Rare"},{id:35,name:"삐삐",gen:1,rarity:"Rare"},{id:36,name:"픽시",gen:1,rarity:"Rare"},{id:37,name:"식스테일",gen:1,rarity:"Rare"},{id:38,name:"나인테일",gen:1,rarity:"Rare"},{id:39,name:"푸린",gen:1,rarity:"Common"},{id:40,name:"푸크린",gen:1,rarity:"Common"},{id:41,name:"주뱃",gen:1,rarity:"Common"},{id:42,name:"골뱃",gen:1,rarity:"Common"},{id:43,name:"뚜벅쵸",gen:1,rarity:"Common"},{id:44,name:"냄새꼬",gen:1,rarity:"Common"},{id:45,name:"라플레시아",gen:1,rarity:"Rare"},{id:46,name:"파라스",gen:1,rarity:"Common"},{id:47,name:"파라섹트",gen:1,rarity:"Common"},{id:48,name:"콘팡",gen:1,rarity:"Common"},{id:49,name:"도나리",gen:1,rarity:"Common"},{id:50,name:"디그다",gen:1,rarity:"Common"},{id:51,name:"닥트리오",gen:1,rarity:"Common"},{id:52,name:"나옹",gen:1,rarity:"Common"},{id:53,name:"페르시온",gen:1,rarity:"Rare"},{id:54,name:"고라파덕",gen:1,rarity:"Common"},{id:55,name:"골덕",gen:1,rarity:"Common"},{id:56,name:"망키",gen:1,rarity:"Common"},{id:57,name:"성원숭",gen:1,rarity:"Common"},{id:58,name:"가디",gen:1,rarity:"Rare"},{id:59,name:"윈디",gen:1,rarity:"Rare"},{id:60,name:"발챙이",gen:1,rarity:"Common"},{id:61,name:"슈륙챙이",gen:1,rarity:"Common"},{id:62,name:"강챙이",gen:1,rarity:"Rare"},{id:63,name:"케이시",gen:1,rarity:"Rare"},{id:64,name:"윤겔라",gen:1,rarity:"Rare"},{id:65,name:"후디",gen:1,rarity:"Epic"},{id:66,name:"알통몬",gen:1,rarity:"Common"},{id:67,name:"근육몬",gen:1,rarity:"Common"},{id:68,name:"괴력몬",gen:1,rarity:"Rare"},{id:69,name:"모다피",gen:1,rarity:"Common"},{id:70,name:"우츠동",gen:1,rarity:"Common"},{id:71,name:"우츠보트",gen:1,rarity:"Rare"},{id:72,name:"왕눈해",gen:1,rarity:"Common"},{id:73,name:"독파리",gen:1,rarity:"Common"},{id:74,name:"꼬마돌",gen:1,rarity:"Common"},{id:75,name:"데구리",gen:1,rarity:"Common"},{id:76,name:"딱구리",gen:1,rarity:"Rare"},{id:77,name:"포니타",gen:1,rarity:"Rare"},{id:78,name:"날쌩마",gen:1,rarity:"Rare"},{id:79,name:"야돈",gen:1,rarity:"Rare"},{id:80,name:"야도란",gen:1,rarity:"Rare"},{id:81,name:"코일",gen:1,rarity:"Common"},{id:82,name:"레어코일",gen:1,rarity:"Common"},{id:83,name:"파오리",gen:1,rarity:"Rare"},{id:84,name:"두두",gen:1,rarity:"Common"},{id:85,name:"두트리오",gen:1,rarity:"Common"},{id:86,name:"쥬쥬",gen:1,rarity:"Common"},{id:87,name:"쥬레곤",gen:1,rarity:"Common"},{id:88,name:"질퍽이",gen:1,rarity:"Common"},{id:89,name:"질뻐기",gen:1,rarity:"Common"},{id:90,name:"셀러",gen:1,rarity:"Rare"},{id:91,name:"파르셀",gen:1,rarity:"Rare"},{id:92,name:"고오스",gen:1,rarity:"Rare"},{id:93,name:"고우스트",gen:1,rarity:"Rare"},{id:94,name:"팬텀",gen:1,rarity:"Epic"},{id:95,name:"롱스톤",gen:1,rarity:"Rare"},{id:96,name:"슬리프",gen:1,rarity:"Common"},{id:97,name:"슬리퍼",gen:1,rarity:"Common"},{id:98,name:"크랩",gen:1,rarity:"Common"},{id:99,name:"킹크랩",gen:1,rarity:"Common"},{id:100,name:"찌리리공",gen:1,rarity:"Common"},{id:101,name:"붐볼",gen:1,rarity:"Common"},{id:102,name:"아라리",gen:1,rarity:"Common"},{id:103,name:"나시",gen:1,rarity:"Rare"},{id:104,name:"탕구리",gen:1,rarity:"Common"},{id:105,name:"텅구리",gen:1,rarity:"Common"},{id:106,name:"시라소몬",gen:1,rarity:"Rare"},{id:107,name:"홍수몬",gen:1,rarity:"Rare"},{id:108,name:"내루미",gen:1,rarity:"Rare"},{id:109,name:"또가스",gen:1,rarity:"Common"},{id:110,name:"또도가스",gen:1,rarity:"Common"},{id:111,name:"뿔카노",gen:1,rarity:"Common"},{id:112,name:"코뿌리",gen:1,rarity:"Rare"},{id:113,name:"럭키",gen:1,rarity:"Epic"},{id:114,name:"덩쿠리",gen:1,rarity:"Rare"},{id:115,name:"캥카",gen:1,rarity:"Epic"},{id:116,name:"쏘드라",gen:1,rarity:"Common"},{id:117,name:"시드라",gen:1,rarity:"Common"},{id:118,name:"콘치",gen:1,rarity:"Common"},{id:119,name:"왕콘치",gen:1,rarity:"Common"},{id:120,name:"별가사리",gen:1,rarity:"Common"},{id:121,name:"아쿠스타",gen:1,rarity:"Rare"},{id:122,name:"마임맨",gen:1,rarity:"Rare"},{id:123,name:"스라크",gen:1,rarity:"Epic"},{id:124,name:"루주라",gen:1,rarity:"Rare"},{id:125,name:"에레브",gen:1,rarity:"Rare"},{id:126,name:"마그마",gen:1,rarity:"Rare"},{id:127,name:"쁘사이저",gen:1,rarity:"Epic"},{id:128,name:"켄타로스",gen:1,rarity:"Rare"},{id:129,name:"잉어킹",gen:1,rarity:"Common"},{id:130,name:"갸라도스",gen:1,rarity:"Epic"},{id:131,name:"라프라스",gen:1,rarity:"Epic"},{id:132,name:"메타몽",gen:1,rarity:"Rare"},{id:133,name:"이브이",gen:1,rarity:"Rare"},{id:134,name:"샤미드",gen:1,rarity:"Rare"},{id:135,name:"쥬피썬더",gen:1,rarity:"Rare"},{id:136,name:"부스터",gen:1,rarity:"Rare"},{id:137,name:"폴리곤",gen:1,rarity:"Rare"},{id:138,name:"암나이트",gen:1,rarity:"Rare"},{id:139,name:"암스타",gen:1,rarity:"Rare"},{id:140,name:"투구",gen:1,rarity:"Rare"},{id:141,name:"투구푸스",gen:1,rarity:"Rare"},{id:142,name:"프테라",gen:1,rarity:"Epic"},{id:143,name:"잠만보",gen:1,rarity:"Epic"},{id:144,name:"프리져",gen:1,rarity:"Legendary"},{id:145,name:"썬더",gen:1,rarity:"Legendary"},{id:146,name:"파이어",gen:1,rarity:"Legendary"},{id:147,name:"미뇽",gen:1,rarity:"Rare"},{id:148,name:"신뇽",gen:1,rarity:"Epic"},{id:149,name:"망나뇽",gen:1,rarity:"Epic"},{id:150,name:"뮤츠",gen:1,rarity:"Legendary"},{id:151,name:"뮤",gen:1,rarity:"Legendary"},{id:152,name:"치코리타",gen:2,rarity:"Common"},{id:153,name:"베이리프",gen:2,rarity:"Common"},{id:154,name:"메가니움",gen:2,rarity:"Rare"},{id:155,name:"브케인",gen:2,rarity:"Common"},{id:156,name:"마그케인",gen:2,rarity:"Common"},{id:157,name:"블레이범",gen:2,rarity:"Rare"},{id:158,name:"리아코",gen:2,rarity:"Common"},{id:159,name:"엘리게이",gen:2,rarity:"Common"},{id:160,name:"장크로다일",gen:2,rarity:"Rare"},{id:161,name:"꼬리선",gen:2,rarity:"Common"},{id:162,name:"다꼬리",gen:2,rarity:"Common"},{id:163,name:"부우부",gen:2,rarity:"Common"},{id:164,name:"야부엉",gen:2,rarity:"Common"},{id:165,name:"레디바",gen:2,rarity:"Common"},{id:166,name:"레디안",gen:2,rarity:"Common"},{id:167,name:"페이검",gen:2,rarity:"Common"},{id:168,name:"아리아도스",gen:2,rarity:"Common"},{id:169,name:"크로뱃",gen:2,rarity:"Rare"},{id:170,name:"초라기",gen:2,rarity:"Common"},{id:171,name:"랜턴",gen:2,rarity:"Common"},{id:172,name:"피츄",gen:2,rarity:"Rare"},{id:173,name:"삐",gen:2,rarity:"Rare"},{id:174,name:"푸푸린",gen:2,rarity:"Common"},{id:175,name:"토게피",gen:2,rarity:"Rare"},{id:176,name:"토게틱",gen:2,rarity:"Rare"},{id:177,name:"네이티",gen:2,rarity:"Common"},{id:178,name:"네이티오",gen:2,rarity:"Common"},{id:179,name:"메리프",gen:2,rarity:"Common"},{id:180,name:"보송송",gen:2,rarity:"Common"},{id:181,name:"전룡",gen:2,rarity:"Rare"},{id:182,name:"아르코",gen:2,rarity:"Rare"},{id:183,name:"마릴",gen:2,rarity:"Common"},{id:184,name:"마릴리",gen:2,rarity:"Common"},{id:185,name:"꼬지모",gen:2,rarity:"Rare"},{id:186,name:"왕구리",gen:2,rarity:"Rare"},{id:187,name:"통통코",gen:2,rarity:"Common"},{id:188,name:"두코",gen:2,rarity:"Common"},{id:189,name:"솜솜코",gen:2,rarity:"Common"},{id:190,name:"에이팜",gen:2,rarity:"Common"},{id:191,name:"해너츠",gen:2,rarity:"Common"},{id:192,name:"해루미",gen:2,rarity:"Common"},{id:193,name:"왕자리",gen:2,rarity:"Common"},{id:194,name:"우파",gen:2,rarity:"Common"},{id:195,name:"누오",gen:2,rarity:"Common"},{id:196,name:"에브이",gen:2,rarity:"Rare"},{id:197,name:"블래키",gen:2,rarity:"Rare"},{id:198,name:"니로우",gen:2,rarity:"Common"},{id:199,name:"야도킹",gen:2,rarity:"Epic"},{id:200,name:"무우마",gen:2,rarity:"Common"},{id:201,name:"안농",gen:2,rarity:"Epic"},{id:202,name:"마자용",gen:2,rarity:"Common"},{id:203,name:"키링키",gen:2,rarity:"Rare"},{id:204,name:"피콘",gen:2,rarity:"Common"},{id:205,name:"쏘콘",gen:2,rarity:"Rare"},{id:206,name:"노고치",gen:2,rarity:"Common"},{id:207,name:"글라이거",gen:2,rarity:"Common"},{id:208,name:"강철톤",gen:2,rarity:"Epic"},{id:209,name:"블루",gen:2,rarity:"Common"},{id:210,name:"그랑블루",gen:2,rarity:"Common"},{id:211,name:"침바루",gen:2,rarity:"Common"},{id:212,name:"핫삼",gen:2,rarity:"Epic"},{id:213,name:"단단지",gen:2,rarity:"Rare"},{id:214,name:"헤라크로스",gen:2,rarity:"Epic"},{id:215,name:"포푸니",gen:2,rarity:"Rare"},{id:216,name:"깜지곰",gen:2,rarity:"Common"},{id:217,name:"링곰",gen:2,rarity:"Common"},{id:218,name:"마그마그",gen:2,rarity:"Common"},{id:219,name:"마그카르고",gen:2,rarity:"Common"},{id:220,name:"꾸꾸리",gen:2,rarity:"Common"},{id:221,name:"메꾸리",gen:2,rarity:"Common"},{id:222,name:"코산호",gen:2,rarity:"Common"},{id:223,name:"총어",gen:2,rarity:"Common"},{id:224,name:"대포무노",gen:2,rarity:"Common"},{id:225,name:"딜리버드",gen:2,rarity:"Rare"},{id:226,name:"만타인",gen:2,rarity:"Common"},{id:227,name:"무장조",gen:2,rarity:"Epic"},{id:228,name:"델빌",gen:2,rarity:"Common"},{id:229,name:"헬가",gen:2,rarity:"Rare"},{id:230,name:"킹드라",gen:2,rarity:"Rare"},{id:231,name:"코코리",gen:2,rarity:"Common"},{id:232,name:"코리갑",gen:2,rarity:"Rare"},{id:233,name:"폴리곤2",gen:2,rarity:"Epic"},{id:234,name:"노라키",gen:2,rarity:"Common"},{id:235,name:"루브도",gen:2,rarity:"Rare"},{id:236,name:"배루키",gen:2,rarity:"Rare"},{id:237,name:"카포에라",gen:2,rarity:"Rare"},{id:238,name:"뽀뽀라",gen:2,rarity:"Rare"},{id:239,name:"에레키드",gen:2,rarity:"Rare"},{id:240,name:"마그비",gen:2,rarity:"Rare"},{id:241,name:"밀탱크",gen:2,rarity:"Rare"},{id:242,name:"해피너스",gen:2,rarity:"Epic"},{id:243,name:"라이코",gen:2,rarity:"Legendary"},{id:244,name:"앤테이",gen:2,rarity:"Legendary"},{id:245,name:"스이쿤",gen:2,rarity:"Legendary"},{id:246,name:"애버라스",gen:2,rarity:"Rare"},{id:247,name:"데기라스",gen:2,rarity:"Epic"},{id:248,name:"마기라스",gen:2,rarity:"Epic"},{id:249,name:"루기아",gen:2,rarity:"Legendary"},{id:250,name:"칠색조",gen:2,rarity:"Legendary"},{id:251,name:"세레비",gen:2,rarity:"Legendary"},{id:252,name:"나무지기",gen:3,rarity:"Common"},{id:253,name:"나무돌이",gen:3,rarity:"Common"},{id:254,name:"나무킹",gen:3,rarity:"Rare"},{id:255,name:"아차모",gen:3,rarity:"Common"},{id:256,name:"영치코",gen:3,rarity:"Common"},{id:257,name:"번치코",gen:3,rarity:"Rare"},{id:258,name:"물짱이",gen:3,rarity:"Common"},{id:259,name:"늪짱이",gen:3,rarity:"Common"},{id:260,name:"대짱이",gen:3,rarity:"Rare"},{id:261,name:"포챠나",gen:3,rarity:"Common"},{id:262,name:"그라에나",gen:3,rarity:"Common"},{id:263,name:"지그제구리",gen:3,rarity:"Common"},{id:264,name:"직구리",gen:3,rarity:"Common"},{id:265,name:"개무소",gen:3,rarity:"Common"},{id:266,name:"실쿤",gen:3,rarity:"Common"},{id:267,name:"뷰티플라이",gen:3,rarity:"Common"},{id:268,name:"카스쿤",gen:3,rarity:"Common"},{id:269,name:"독케일",gen:3,rarity:"Common"},{id:270,name:"연꽃몬",gen:3,rarity:"Common"},{id:271,name:"로토스",gen:3,rarity:"Common"},{id:272,name:"로파파",gen:3,rarity:"Rare"},{id:273,name:"도토링",gen:3,rarity:"Common"},{id:274,name:"잎새코",gen:3,rarity:"Common"},{id:275,name:"다탱구",gen:3,rarity:"Rare"},{id:276,name:"테일로",gen:3,rarity:"Common"},{id:277,name:"스왈로",gen:3,rarity:"Common"},{id:278,name:"갈모매",gen:3,rarity:"Common"},{id:279,name:"패리퍼",gen:3,rarity:"Common"},{id:280,name:"랄토스",gen:3,rarity:"Rare"},{id:281,name:"킬리아",gen:3,rarity:"Rare"},{id:282,name:"가디안",gen:3,rarity:"Epic"},{id:283,name:"비구술",gen:3,rarity:"Common"},{id:284,name:"비나방",gen:3,rarity:"Common"},{id:285,name:"버섯꼬",gen:3,rarity:"Common"},{id:286,name:"버섯모",gen:3,rarity:"Rare"},{id:287,name:"게을로",gen:3,rarity:"Common"},{id:288,name:"발바로",gen:3,rarity:"Common"},{id:289,name:"게을킹",gen:3,rarity:"Rare"},{id:290,name:"토중몬",gen:3,rarity:"Common"},{id:291,name:"아이스크",gen:3,rarity:"Rare"},{id:292,name:"껍질몬",gen:3,rarity:"Epic"},{id:293,name:"소곤룡",gen:3,rarity:"Common"},{id:294,name:"노공룡",gen:3,rarity:"Common"},{id:295,name:"폭음룡",gen:3,rarity:"Rare"},{id:296,name:"마크탕",gen:3,rarity:"Common"},{id:297,name:"하리뭉",gen:3,rarity:"Common"},{id:298,name:"루리리",gen:3,rarity:"Common"},{id:299,name:"코코파스",gen:3,rarity:"Rare"},{id:300,name:"에나비",gen:3,rarity:"Common"},{id:301,name:"델케티",gen:3,rarity:"Common"},{id:302,name:"깜까미",gen:3,rarity:"Rare"},{id:303,name:"입치트",gen:3,rarity:"Rare"},{id:304,name:"가보리",gen:3,rarity:"Common"},{id:305,name:"갱도라",gen:3,rarity:"Common"},{id:306,name:"보스로라",gen:3,rarity:"Epic"},{id:307,name:"요가랑",gen:3,rarity:"Common"},{id:308,name:"요가램",gen:3,rarity:"Common"},{id:309,name:"썬더라이",gen:3,rarity:"Common"},{id:310,name:"썬더볼트",gen:3,rarity:"Rare"},{id:311,name:"플러시",gen:3,rarity:"Rare"},{id:312,name:"마이농",gen:3,rarity:"Rare"},{id:313,name:"볼비트",gen:3,rarity:"Common"},{id:314,name:"네오비트",gen:3,rarity:"Common"},{id:315,name:"로젤리아",gen:3,rarity:"Common"},{id:316,name:"꼴깍몬",gen:3,rarity:"Common"},{id:317,name:"꿀꺽몬",gen:3,rarity:"Common"},{id:318,name:"샤프니아",gen:3,rarity:"Common"},{id:319,name:"샤크니아",gen:3,rarity:"Rare"},{id:320,name:"고래왕자",gen:3,rarity:"Common"},{id:321,name:"고래왕",gen:3,rarity:"Rare"},{id:322,name:"둔타",gen:3,rarity:"Common"},{id:323,name:"폭타",gen:3,rarity:"Rare"},{id:324,name:"코터스",gen:3,rarity:"Common"},{id:325,name:"피그점프",gen:3,rarity:"Common"},{id:326,name:"피그킹",gen:3,rarity:"Common"},{id:327,name:"얼루기",gen:3,rarity:"Common"},{id:328,name:"톱치",gen:3,rarity:"Common"},{id:329,name:"비브라바",gen:3,rarity:"Common"},{id:330,name:"플라이곤",gen:3,rarity:"Epic"},{id:331,name:"선인왕",gen:3,rarity:"Common"},{id:332,name:"밤선인",gen:3,rarity:"Common"},{id:333,name:"파비코",gen:3,rarity:"Common"},{id:334,name:"파비코리",gen:3,rarity:"Rare"},{id:335,name:"쟝고",gen:3,rarity:"Rare"},{id:336,name:"세비퍼",gen:3,rarity:"Rare"},{id:337,name:"루나톤",gen:3,rarity:"Rare"},{id:338,name:"솔록",gen:3,rarity:"Rare"},{id:339,name:"미꾸리",gen:3,rarity:"Common"},{id:340,name:"메깅",gen:3,rarity:"Common"},{id:341,name:"가재군",gen:3,rarity:"Common"},{id:342,name:"가재장군",gen:3,rarity:"Common"},{id:343,name:"오뚝군",gen:3,rarity:"Common"},{id:344,name:"점토도리",gen:3,rarity:"Rare"},{id:345,name:"릴링",gen:3,rarity:"Rare"},{id:346,name:"릴리요",gen:3,rarity:"Rare"},{id:347,name:"아노딥스",gen:3,rarity:"Rare"},{id:348,name:"아말도",gen:3,rarity:"Rare"},{id:349,name:"빈티나",gen:3,rarity:"Rare"},{id:350,name:"밀로틱",gen:3,rarity:"Epic"},{id:351,name:"캐스퐁",gen:3,rarity:"Rare"},{id:352,name:"켈리몬",gen:3,rarity:"Rare"},{id:353,name:"어둠대신",gen:3,rarity:"Common"},{id:354,name:"다크펫",gen:3,rarity:"Rare"},{id:355,name:"해골몽",gen:3,rarity:"Common"},{id:356,name:"미라몽",gen:3,rarity:"Rare"},{id:357,name:"트로피우스",gen:3,rarity:"Rare"},{id:358,name:"치렁",gen:3,rarity:"Rare"},{id:359,name:"앱솔",gen:3,rarity:"Epic"},{id:360,name:"마자",gen:3,rarity:"Common"},{id:361,name:"눈꼬마",gen:3,rarity:"Common"},{id:362,name:"얼음귀신",gen:3,rarity:"Rare"},{id:363,name:"대굴레오",gen:3,rarity:"Common"},{id:364,name:"씨레오",gen:3,rarity:"Common"},{id:365,name:"씨카이저",gen:3,rarity:"Rare"},{id:366,name:"진주몽",gen:3,rarity:"Common"},{id:367,name:"헌테일",gen:3,rarity:"Rare"},{id:368,name:"분홍장이",gen:3,rarity:"Rare"},{id:369,name:"시라칸",gen:3,rarity:"Rare"},{id:370,name:"사랑동이",gen:3,rarity:"Common"},{id:371,name:"아공이",gen:3,rarity:"Rare"},{id:372,name:"쉘곤",gen:3,rarity:"Epic"},{id:373,name:"보만다",gen:3,rarity:"Epic"},{id:374,name:"메탕",gen:3,rarity:"Rare"},{id:375,name:"메탕구",gen:3,rarity:"Epic"},{id:376,name:"메타그로스",gen:3,rarity:"Epic"},{id:377,name:"레지락",gen:3,rarity:"Legendary"},{id:378,name:"레지아이스",gen:3,rarity:"Legendary"},{id:379,name:"레지스틸",gen:3,rarity:"Legendary"},{id:380,name:"라티아스",gen:3,rarity:"Legendary"},{id:381,name:"라티오스",gen:3,rarity:"Legendary"},{id:382,name:"가이오가",gen:3,rarity:"Legendary"},{id:383,name:"그란돈",gen:3,rarity:"Legendary"},{id:384,name:"레쿠쟈",gen:3,rarity:"Legendary"},{id:385,name:"지라치",gen:3,rarity:"Legendary"},{id:386,name:"테오키스",gen:3,rarity:"Legendary"}];
const RARITY_STYLES = { 'Common': 'rarity-common', 'Rare': 'rarity-rare', 'Epic': 'rarity-epic', 'Legendary': 'rarity-legendary' };
const EGG_TYPES = {
    normalEgg: { name: '포켓몬 알', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' },
    rareEgg: { name: '레어 포켓몬 알', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png' },
    epicEgg: { name: '에픽 포켓몬 알', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png' }
};

let data = {};
let pokedexTab = 'collected';
let selectedPokemonKey = null;
let synthesisSelection = [];
let todoIdsToComplete = [];
let pokemonForComparison = null;

const dom = {
    appContainer: document.getElementById('app-container'),
    todoForm: document.getElementById('todo-form'),
    todoInput: document.getElementById('todo-input'),
    todoList: document.getElementById('todo-list'),
    inventoryList: document.getElementById('inventory-list'),
    pokedexProgress: document.getElementById('pokedex-progress'),
    pokedexListContainer: document.getElementById('pokedex-list-container'),
    pokemonDetailView: document.getElementById('pokemon-detail-view'),
    genFilter: document.getElementById('generation-filter'),
    rarityFilter: document.getElementById('rarity-filter'),
    mainTabPokedex: document.getElementById('main-tab-pokedex'),
    mainTabShop: document.getElementById('main-tab-shop'),
    pokedexView: document.getElementById('pokedex-view'),
    shopView: document.getElementById('shop-view'),
    pokedexTabCollected: document.getElementById('pokedex-tab-collected'),
    pokedexTabDuplicates: document.getElementById('pokedex-tab-duplicates'),
    pokedexTabUncollected: document.getElementById('pokedex-tab-uncollected'),
    synthesisControls: document.getElementById('synthesis-controls'),
    synthesisBtn: document.getElementById('synthesis-btn'),
    synthesisCount: document.getElementById('synthesis-count'),
    shopSellList: document.getElementById('shop-sell-list'),
    shopBuyList: document.getElementById('shop-buy-list'),
    modalCaught: document.getElementById('modal-caught'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    pokeballContainer: document.getElementById('pokeball-container'),
    caughtPokemonInfo: document.getElementById('caught-pokemon-info'),
    pokemonName: document.getElementById('pokemon-name'),
    pokemonImage: document.getElementById('pokemon-image'),
    pokemonRarity: document.getElementById('pokemon-rarity'),
    pokemonId: document.getElementById('pokemon-id'),
    pokemonIsNew: document.getElementById('pokemon-is-new'),
    modalTestAlert: document.getElementById('modal-test-alert'),
    modalTestCloseBtn: document.getElementById('modal-test-close-btn'),
    adminPage: document.getElementById('admin-page'),
    adminCloseBtn: document.getElementById('admin-close-btn'),
    adminSaveBtn: document.getElementById('admin-save-btn'),
    adminPokemonList: document.getElementById('admin-pokemon-list'),
    adminProbabilitySettings: document.getElementById('admin-probability-settings'),
    adminShopSettings: document.getElementById('admin-shop-settings'),
    adminRewardSettings: document.getElementById('admin-reward-settings'),
    adminInventorySettings: document.getElementById('admin-inventory-settings'),
    adminDailyTodoSettings: document.getElementById('admin-daily-todo-settings'),
    adminNewDailyTodoInput: document.getElementById('admin-new-daily-todo-input'),
    adminAddDailyTodoBtn: document.getElementById('admin-add-daily-todo-btn'),
    modalPassword: document.getElementById('modal-password'),
    passwordInput: document.getElementById('password-input'),
    passwordConfirmBtn: document.getElementById('password-confirm-btn'),
    passwordCancelBtn: document.getElementById('password-cancel-btn'),
    adminPasswordSetting: document.getElementById('admin-password-setting'),
    bulkCompleteBtn: document.getElementById('bulk-complete-btn'),
    compareBtn: document.getElementById('compare-btn'),
};

const defaultData = {
    todos: {},
    pokedex: {},
    inventory: {
        coins: 0,
        normalEgg: 0,
        rareEgg: 0,
        epicEgg: 0,
        pityCount: 0
    },
    dailyTodos: ["구몬하기", "책읽기", "듀오링고하기"],
    lastLoginDate: null,
    completionPassword: "",
    rewardProbabilities: {
        epic: 1,
        rare: 4,
        normal: 95
    },
    pitySystemConfig: {
        threshold: 30
    },
    probabilityConfig: {
        normalEgg: { Common: 79, Rare: 17, Epic: 3, Legendary: 1 },
        rareEgg: { Common: 0, Rare: 80, Epic: 15, Legendary: 5 },
        epicEgg: { Common: 0, Rare: 0, Epic: 85, Legendary: 15 },
        shiny: { Common: 0.6, Rare: 0.3, Epic: 0.1, Legendary: 0.1 }
    },
    shopConfig: {
        sell: { normalEgg: 1, rareEgg: 3, epicEgg: 10 },
        buy: { normalEgg: 10, rareEgg: 50, epicEgg: 500 }
    }
};

// --- 데이터 관리 ---
function deepMerge(target, source) {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = deepMerge(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

const loadData = () => {
    const savedData = JSON.parse(localStorage.getItem('pokemon-data-v4'));
    data = deepMerge(defaultData, savedData || {});
    checkDateAndResetDailies();
};

const saveData = () => {
    localStorage.setItem('pokemon-data-v4', JSON.stringify(data));
};

function checkDateAndResetDailies() {
    const today = new Date().toISOString().slice(0, 10);
    if (data.lastLoginDate !== today) {
        Object.keys(data.todos).forEach(key => {
            if (data.todos[key].isDaily) {
                data.todos[key].completed = false;
            }
        });
        
        data.dailyTodos.forEach((dailyText, index) => {
            const dailyId = `daily_${index}`;
            if (!data.todos[dailyId]) {
                data.todos[dailyId] = {
                    text: dailyText,
                    completed: false,
                    isDaily: true
                };
            }
        });

        data.lastLoginDate = today;
        saveData();
    }
}

// --- UI 초기 설정 및 이벤트 리스너 ---
const setupUI = () => {
    const generations = [...new Set(POKEMON_DATA.map(p => p.gen))];
    generations.sort((a, b) => a - b).forEach(gen => {
        dom.genFilter.innerHTML += `<option value="${gen}">${gen}세대</option>`;
    });
    Object.keys(defaultData.probabilityConfig.normalEgg).forEach(rarity => {
        dom.rarityFilter.innerHTML += `<option value="${rarity}">${rarity}</option>`;
    });
};

const setupListeners = () => {
    dom.todoForm.addEventListener('submit', handleAddTodo);
    dom.todoList.addEventListener('click', handleTodoClick);
    dom.bulkCompleteBtn.addEventListener('click', handleBulkComplete);
    dom.inventoryList.addEventListener('click', handleInventoryClick);
    dom.genFilter.addEventListener('change', renderPokedex);
    dom.rarityFilter.addEventListener('change', renderPokedex);
    dom.mainTabPokedex.addEventListener('click', () => switchMainTab('pokedex'));
    dom.mainTabShop.addEventListener('click', () => switchMainTab('shop'));
    dom.pokedexTabCollected.addEventListener('click', () => switchPokedexTab('collected'));
    dom.pokedexTabDuplicates.addEventListener('click', () => switchPokedexTab('duplicates'));
    dom.pokedexTabUncollected.addEventListener('click', () => switchPokedexTab('uncollected'));
    dom.pokedexListContainer.addEventListener('click', handlePokedexListClick);
    dom.pokemonDetailView.addEventListener('click', handleDetailViewClick);
    dom.synthesisBtn.addEventListener('click', handleSynthesis);
    dom.shopSellList.addEventListener('click', (e) => handleShopAction(e, 'sell'));
    dom.shopBuyList.addEventListener('click', (e) => handleShopAction(e, 'buy'));
    dom.modalCloseBtn.addEventListener('click', () => {
        dom.modalCaught.classList.add('hidden');
        dom.compareBtn.classList.add('hidden');
        pokemonForComparison = null;
    });
    dom.modalTestCloseBtn.addEventListener('click', () => dom.modalTestAlert.classList.add('hidden'));
    dom.adminCloseBtn.addEventListener('click', closeAdminPage);
    dom.adminSaveBtn.addEventListener('click', saveAdminChanges);
    dom.adminAddDailyTodoBtn.addEventListener('click', handleAdminAddDailyTodo);
    dom.adminDailyTodoSettings.addEventListener('click', handleAdminEditOrRemoveDailyTodo);
    dom.passwordConfirmBtn.addEventListener('click', handlePasswordConfirm);
    dom.passwordCancelBtn.addEventListener('click', () => {
        dom.modalPassword.classList.add('hidden');
        todoIdsToComplete = [];
    });
    dom.compareBtn.addEventListener('click', handleCompareToggle);
};

// --- 렌더링 함수 ---
const renderAll = () => {
    renderTodos();
    renderInventory();
    renderPokedex();
    renderShop();
    updatePokedexProgress();
};

// --- To-Do 관련 함수 ---
function handleAddTodo(event) {
    event.preventDefault();
    const taskText = dom.todoInput.value.trim();
    if (taskText === "settingPage") {
        openAdminPage();
        dom.todoInput.value = "";
        return;
    }
    if (taskText) {
        const newTodoId = "todo_" + Date.now();
        data.todos[newTodoId] = { text: taskText, completed: false, isDaily: false };
        saveData();
        renderTodos();
        dom.todoInput.value = "";
    }
}

function handleTodoClick(event) {
    const taskItem = event.target.closest(".task-item");
    if (!taskItem) return;
    const todoId = taskItem.dataset.id;

    if (event.target.matches(".complete-btn")) {
        startCompletionProcess([todoId]);
    } else if (event.target.matches(".delete-btn")) {
        handleDeleteTodo(todoId);
    } else if (event.target.matches(".todo-checkbox")) {
        updateBulkCompleteButtonVisibility();
    }
}

function handleBulkComplete() {
    const checkedIds = [...dom.todoList.querySelectorAll('.todo-checkbox:checked')]
        .map(checkbox => checkbox.closest('.task-item').dataset.id);
    
    if (checkedIds.length > 0) {
        startCompletionProcess(checkedIds);
    } else {
        showNotification("완료할 항목을 선택해주세요.", "error");
    }
}

function startCompletionProcess(ids) {
    if (ids.length === 0) return;
    todoIdsToComplete = ids;

    if (data.completionPassword) {
        dom.passwordInput.value = '';
        dom.modalPassword.classList.remove('hidden');
        dom.passwordInput.focus();
    } else {
        processCompletions();
    }
}

function handlePasswordConfirm() {
    const password = dom.passwordInput.value;
    if (password === data.completionPassword) {
        processCompletions();
    } else {
        showNotification('확인번호가 일치하지 않습니다.', 'error');
    }
    dom.modalPassword.classList.add('hidden');
}

function processCompletions() {
    if (todoIdsToComplete.length === 0) return;

    let rewardsSummary = { normalEgg: 0, rareEgg: 0, epicEgg: 0 };
    let totalCompleted = 0;

    todoIdsToComplete.forEach(id => {
        const todo = data.todos[id];
        if (!todo || todo.completed) return;

        totalCompleted++;
        if (todo.text === "1q2w3e4r!") {
            runTestMode();
            delete data.todos[id];
        } else {
            todo.completed = true;
            const pityThreshold = data.pitySystemConfig.threshold;
            
            if (data.inventory.pityCount >= pityThreshold) {
                data.inventory.rareEgg++;
                rewardsSummary.rareEgg++;
                data.inventory.pityCount = 0;
            } else {
                const randomPercent = Math.random() * 100;
                const probs = data.rewardProbabilities;
                if (randomPercent < probs.epic) {
                    data.inventory.epicEgg++;
                    rewardsSummary.epicEgg++;
                    data.inventory.pityCount = 0;
                } else if (randomPercent < probs.epic + probs.rare) {
                    data.inventory.rareEgg++;
                    rewardsSummary.rareEgg++;
                    data.inventory.pityCount = 0;
                } else {
                    data.inventory.normalEgg++;
                    rewardsSummary.normalEgg++;
                    data.inventory.pityCount++;
                }
            }
        }
    });

    if (totalCompleted > 0) {
        let summaryMessage = `${totalCompleted}개의 할 일을 완료했습니다! 획득: `;
        let rewardsParts = [];
        if (rewardsSummary.normalEgg > 0) rewardsParts.push(`포켓몬 알 x${rewardsSummary.normalEgg}`);
        if (rewardsSummary.rareEgg > 0) rewardsParts.push(`레어 알 x${rewardsSummary.rareEgg}`);
        if (rewardsSummary.epicEgg > 0) rewardsParts.push(`에픽 알 x${rewardsSummary.epicEgg}`);
        
        if (rewardsParts.length > 0) {
            showNotification(summaryMessage + rewardsParts.join(', '));
        } else {
            showNotification(`${totalCompleted}개의 할 일을 완료했습니다!`);
        }
    }
    
    saveData();
    renderAll();
    todoIdsToComplete = [];
}


function handleDeleteTodo(todoId) {
    if (data.todos[todoId] && !data.todos[todoId].isDaily) {
        delete data.todos[todoId];
        saveData();
        renderTodos();
    } else {
        showNotification("고정 할 일은 삭제할 수 없습니다.", "error");
    }
}

function runTestMode() {
    const shuffled = [...POKEMON_DATA].sort(() => 0.5 - Math.random());
    
    // 중복 일반 포켓몬 추가
    const testPokemon = shuffled.slice(0, 3);
    testPokemon.forEach(pokemon => {
        const pokemonKey = `${pokemon.id}_normal`;
        if (data.pokedex[pokemonKey]) {
            data.pokedex[pokemonKey].count += 2;
        } else {
            data.pokedex[pokemonKey] = { ...pokemon, isShiny: false, count: 2 };
        }
    });

    // 이로치 포켓몬 추가
    const shinyPokemon = shuffled.slice(3, 6);
    shinyPokemon.forEach(pokemon => {
        const pokemonKey = `${pokemon.id}_shiny`;
        if (data.pokedex[pokemonKey]) {
            data.pokedex[pokemonKey].count++;
        } else {
            data.pokedex[pokemonKey] = { ...pokemon, isShiny: true, count: 1 };
        }
    });

    // 알 추가
    data.inventory.normalEgg++;
    data.inventory.rareEgg++;
    data.inventory.epicEgg++;

    saveData();
    renderAll();
    
    const modal = document.getElementById('modal-test-alert');
    modal.querySelector('h2').textContent = '테스트 모드 활성화';
    modal.querySelector('p').innerHTML = '중복 포켓몬 3종 (각 2마리),<br>이로치 포켓몬 3종 (각 1마리),<br>알 3종 (각 1개)이 추가되었습니다.';
    modal.classList.remove("hidden");
}

function renderTodos() {
    dom.todoList.innerHTML = "";
    const todos = Object.entries(data.todos);
    if (todos.length === 0) {
        dom.todoList.innerHTML = '<li class="text-gray-500 text-center py-4">할 일이 없습니다.</li>';
        dom.bulkCompleteBtn.classList.add('hidden');
        return;
    }
    let hasUncompletedTasks = false;
    todos.sort(([, a], [, b]) => (a.isDaily === b.isDaily) ? (a.completed - b.completed) : (b.isDaily ? 1 : -1))
         .forEach(([id, todo]) => {
            if (!todo.completed) hasUncompletedTasks = true;
            const li = document.createElement("li");
            li.dataset.id = id;
            const completedClass = todo.completed ? "bg-gray-700 text-gray-500 line-through" : "bg-gray-800";
            li.className = `task-item flex items-center p-3 rounded-lg transition-colors ${completedClass}`;
            
            const checkbox = todo.completed ? '' : '<input type="checkbox" class="todo-checkbox mr-3 h-5 w-5 flex-shrink-0">';
            const dailyIcon = todo.isDaily ? '<span class="mr-2 text-yellow-400" title="고정 할 일">★</span>' : '';
            let buttons = !todo.completed ? `<button class="complete-btn bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded-md mr-2">완료</button>` : '';
            if (!todo.isDaily) {
                buttons += `<button class="delete-btn bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded-md">삭제</button>`;
            }
            li.innerHTML = `${checkbox}${dailyIcon}<span class="flex-grow">${todo.text}</span> <div class="flex-shrink-0">${buttons}</div>`;
            dom.todoList.appendChild(li);
        });
    
    if (hasUncompletedTasks) {
        dom.bulkCompleteBtn.classList.remove('hidden');
    } else {
        dom.bulkCompleteBtn.classList.add('hidden');
    }
    updateBulkCompleteButtonVisibility();
}

function updateBulkCompleteButtonVisibility() {
    const checkedCount = dom.todoList.querySelectorAll('.todo-checkbox:checked').length;
    if (checkedCount > 0) {
        dom.bulkCompleteBtn.textContent = `${checkedCount}개 항목 완료`;
    } else {
        dom.bulkCompleteBtn.textContent = '선택 항목 완료';
    }
}

// --- 인벤토리 관련 함수 ---
function renderInventory() {
    dom.inventoryList.innerHTML = "";
    let inventoryHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center pl-11">
                <span class="font-bold text-lg">코인</span>
            </div>
            <span class="font-bold text-lg text-yellow-400">${data.inventory.coins}</span>
        </div>`;
    for (const eggType in EGG_TYPES) {
        const eggInfo = EGG_TYPES[eggType];
        const count = data.inventory[eggType] || 0;
        const disabled = count <= 0;
        inventoryHTML += `
            <div class="flex items-center justify-between">
                <div class="flex items-center"><img src="${eggInfo.img}" class="h-8 w-8 mr-3"><span class="font-bold text-lg">${eggInfo.name}</span></div>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-lg">${count}</span>
                    <button data-egg-type="${eggType}" class="hatch-btn bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-md ${disabled ? "opacity-50 cursor-not-allowed" : ""}" ${disabled ? "disabled" : ""}>부화</button>
                </div>
            </div>`;
    }
    dom.inventoryList.innerHTML = inventoryHTML;
}

function handleInventoryClick(event) {
    const hatchButton = event.target.closest(".hatch-btn");
    if (hatchButton && !hatchButton.disabled) {
        hatchEgg(hatchButton.dataset.eggType);
    }
}

function hatchEgg(eggType) {
    if (!data.inventory[eggType] || data.inventory[eggType] <= 0) return;
    data.inventory[eggType]--;
    const probabilities = data.probabilityConfig[eggType];
    const caughtPokemon = selectRandomPokemon(probabilities);
    if (!caughtPokemon) {
        data.inventory[eggType]++;
        showNotification("알 부화에 실패했습니다.", "error");
        saveData();
        renderAll();
        return;
    }
    const isShiny = Math.random() < (data.probabilityConfig.shiny[caughtPokemon.rarity] / 100);
    const pokemonKey = `${caughtPokemon.id}_${isShiny ? "shiny" : "normal"}`;
    const isNew = data.pokedex[pokemonKey] === undefined;
    if (data.pokedex[pokemonKey]) {
        data.pokedex[pokemonKey].count++;
    } else {
        data.pokedex[pokemonKey] = { ...caughtPokemon, isShiny: isShiny, count: 1 };
    }
    saveData();
    renderAll();
    showCaughtModal(data.pokedex[pokemonKey], isNew, eggType);
}

function selectRandomPokemon(probabilities) {
    let total = 0;
    for (const rarity in probabilities) {
        total += probabilities[rarity];
    }
    let random = Math.random() * total;
    let selectedRarity = null;
    for (const rarity in probabilities) {
        if (random < probabilities[rarity]) {
            selectedRarity = rarity;
            break;
        }
        random -= probabilities[rarity];
    }
    if (!selectedRarity) return null;
    const candidates = POKEMON_DATA.filter(p => p.rarity === selectedRarity);
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
}

// --- 도감 관련 함수 ---
function updatePokedexProgress() {
    const collectedIds = Object.keys(data.pokedex).map(key => key.split('_')[0]);
    const uniqueCollectedCount = new Set(collectedIds).size;
    const totalPokemonCount = POKEMON_DATA.length;
    dom.pokedexProgress.textContent = `도감 완성도: ${uniqueCollectedCount} / ${totalPokemonCount}`;
}

function renderPokedex() {
    dom.pokedexListContainer.innerHTML = "";
    let filteredList;
    if (pokedexTab === 'uncollected') {
        const collectedIds = new Set(Object.keys(data.pokedex).map(key => String(key.split('_')[0])));
        filteredList = POKEMON_DATA.filter(p => !collectedIds.has(String(p.id)));
    } else {
        let allCollected = Object.values(data.pokedex);
        if (pokedexTab === 'duplicates') {
            filteredList = allCollected.filter(p => p.count > 1);
        } else {
            filteredList = allCollected;
        }
    }
    const genFilterValue = dom.genFilter.value;
    const rarityFilterValue = dom.rarityFilter.value;
    if (genFilterValue !== 'all') filteredList = filteredList.filter(p => p.gen == genFilterValue);
    if (rarityFilterValue !== 'all') filteredList = filteredList.filter(p => p.rarity === rarityFilterValue);
    filteredList.sort((a, b) => a.id - b.id || (a.isShiny ? 1 : 0) - (b.isShiny ? 1 : 0));
    if (filteredList.length === 0) {
        dom.pokedexListContainer.innerHTML = '<div class="text-center text-gray-500 py-8">해당하는 포켓몬이 없습니다.</div>';
        showPokemonDetails(null);
        return;
    }
    filteredList.forEach(pokemon => {
        const pokemonKey = `${pokemon.id}_${pokemon.isShiny ? "shiny" : "normal"}`;
        const isSelectedForSynthesis = synthesisSelection.includes(pokemonKey);
        const li = document.createElement("div");
        li.className = `pokedex-list-item p-2 rounded-md hover:bg-gray-700 cursor-pointer flex justify-between items-center ${selectedPokemonKey === pokemonKey ? "selected" : ""}`;
        li.dataset.key = pokemonKey;
        const nameClass = pokedexTab === 'uncollected' ? "text-gray-500" : "font-semibold";
        const shinyMark = pokemon.isShiny ? "✨" : "";
        let countDisplay = '';
        if (pokedexTab !== 'uncollected') {
            const synthesisMark = isSelectedForSynthesis ? '<span class="text-xs text-purple-400 mr-2">선택됨</span>' : '';
            countDisplay = `<div>${synthesisMark}<span class="text-sm font-bold text-gray-300">x${pokemon.count || 0}</span></div>`;
        }
        li.innerHTML = `<div><span class="text-gray-400">#${String(pokemon.id).padStart(3, "0")}</span><span class="ml-3 ${nameClass}">${pokemon.name} ${shinyMark}</span></div>${countDisplay}`;
        dom.pokedexListContainer.appendChild(li);
    });
    const currentSelectionExists = selectedPokemonKey && (data.pokedex[selectedPokemonKey] || pokedexTab === 'uncollected');
    if (currentSelectionExists) {
        showPokemonDetails(selectedPokemonKey);
    } else if (filteredList.length > 0) {
        const firstPokemon = filteredList[0];
        const firstPokemonKey = `${firstPokemon.id}_${firstPokemon.isShiny ? "shiny" : "normal"}`;
        showPokemonDetails(firstPokemonKey);
    } else {
        showPokemonDetails(null);
    }
}

function showPokemonDetails(pokemonKey) {
    selectedPokemonKey = pokemonKey;
    let pokemon;
    if (pokemonKey && data.pokedex[pokemonKey]) {
        pokemon = data.pokedex[pokemonKey];
    } else if (pokemonKey) {
        const [id] = pokemonKey.split('_');
        const basePokemon = POKEMON_DATA.find(p => p.id == id);
        if (basePokemon) {
            pokemon = { ...basePokemon, isShiny: pokemonKey.endsWith('shiny'), count: 0 };
        }
    }
    if (!pokemon) {
        dom.pokemonDetailView.innerHTML = '<p class="text-gray-500">리스트에서 포켓몬을 선택하세요.</p>';
        return;
    }
    
    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    if (pokemon.isShiny) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`;
    }
    
    const hasPokemon = pokemon.count > 0;
    const shinyText = pokemon.isShiny ? "shiny-text" : "text-white";
    const shinyMark = pokemon.isShiny ? "✨" : "";
    if (hasPokemon) {
        const isSelectedForSynthesis = synthesisSelection.includes(selectedPokemonKey);
        let synthesisButton = '';
        if (pokedexTab === 'duplicates' && pokemon.count > 1) {
            const disabled = synthesisSelection.length >= 3 && !isSelectedForSynthesis;
            synthesisButton = isSelectedForSynthesis
                ? `<button data-action="deselect-synthesis" class="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">합성 선택 해제</button>`
                : `<button data-action="select-synthesis" class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}" ${disabled ? 'disabled' : ''}>합성용으로 선택</button>`;
        }
        dom.pokemonDetailView.innerHTML = `
            <div class="w-full text-center">
                <img src="${imageUrl}" alt="${pokemon.name}" class="mx-auto h-48 w-48 object-contain mb-4">
                <h3 class="text-3xl font-bold ${shinyText}">${pokemon.name} ${shinyMark}</h3>
                <p class="text-gray-400 mb-2">#${String(pokemon.id).padStart(3, "0")}</p>
                <div class="flex justify-center items-center gap-2 mb-4">
                    <span class="px-3 py-1 text-sm font-semibold text-white rounded-full ${RARITY_STYLES[pokemon.rarity]}">${pokemon.rarity}</span>
                    <span class="text-lg font-bold">x${pokemon.count}</span>
                </div>
                ${synthesisButton}
            </div>`;
    } else {
        dom.pokemonDetailView.innerHTML = `
            <div class="w-full text-center">
                <img src="${imageUrl}" alt="${pokemon.name}" class="mx-auto h-48 w-48 object-contain mb-4 pokemon-silhouette">
                <h3 class="text-3xl font-bold text-gray-500">???</h3>
                <p class="text-gray-400 mb-2">#${String(pokemon.id).padStart(3, "0")}</p>
                <div class="flex justify-center items-center gap-2 mb-4"><span class="px-3 py-1 text-sm font-semibold text-gray-200 bg-gray-600 rounded-full">${pokemon.rarity}</span></div>
                <p class="text-gray-500">아직 발견하지 못한 포켓몬입니다.</p>
            </div>`;
    }
    document.querySelectorAll(".pokedex-list-item").forEach(el => el.classList.remove("selected"));
    const selectedElement = document.querySelector(`.pokedex-list-item[data-key='${pokemonKey}']`);
    if (selectedElement) selectedElement.classList.add("selected");
}

function switchPokedexTab(tabName) {
    pokedexTab = tabName;
    synthesisSelection = [];
    selectedPokemonKey = null;
    const tabs = { collected: dom.pokedexTabCollected, duplicates: dom.pokedexTabDuplicates, uncollected: dom.pokedexTabUncollected };
    for (const key in tabs) {
        const isSelected = key === tabName;
        tabs[key].classList.toggle("border-blue-500", isSelected);
        tabs[key].classList.toggle("text-white", isSelected);
        tabs[key].classList.toggle("text-gray-500", !isSelected);
    }
    dom.synthesisControls.classList.toggle("hidden", tabName !== 'duplicates');
    updateSynthesisUI();
    renderPokedex();
}

function handlePokedexListClick(event) {
    const listItem = event.target.closest(".pokedex-list-item");
    if (listItem) showPokemonDetails(listItem.dataset.key);
}

function handleDetailViewClick(event) {
    const button = event.target.closest("button");
    if (!button || !selectedPokemonKey) return;
    const action = button.dataset.action;
    const pokemonToSelect = data.pokedex[selectedPokemonKey];
    if (!pokemonToSelect || pokemonToSelect.count <= 1) {
        showNotification("합성에는 2마리 이상 보유한 포켓몬만 사용할 수 있습니다.", "error");
        return;
    }
    const index = synthesisSelection.indexOf(selectedPokemonKey);
    if (action === 'select-synthesis' && index === -1 && synthesisSelection.length < 3) {
        synthesisSelection.push(selectedPokemonKey);
    } else if (action === 'deselect-synthesis' && index > -1) {
        synthesisSelection.splice(index, 1);
    }
    updateSynthesisUI();
    renderPokedex();
}

// --- 합성 기능 ---
function updateSynthesisUI() {
    dom.synthesisCount.textContent = synthesisSelection.length;
    dom.synthesisBtn.disabled = synthesisSelection.length !== 3;
}

function handleSynthesis() {
    if (synthesisSelection.length !== 3) return;

    const selectedPokemons = synthesisSelection.map(key => data.pokedex[key]);
    
    selectedPokemons.forEach(p => {
        const key = `${p.id}_${p.isShiny ? "shiny" : "normal"}`;
        data.pokedex[key].count--;
        if(data.pokedex[key].count === 0) {
            delete data.pokedex[key];
        }
    });

    const totalRarityValue = selectedPokemons.reduce((sum, p) => {
        const rarityMap = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
        return sum + rarityMap[p.rarity] * (p.isShiny ? 1.5 : 1);
    }, 0);

    let resultRarity;
    if (totalRarityValue >= 10) resultRarity = 'Legendary';
    else if (totalRarityValue >= 7) resultRarity = 'Epic';
    else if (totalRarityValue >= 4) resultRarity = 'Rare';
    else resultRarity = 'Common';
    
    const probabilities = { [resultRarity]: 100 };
    const caughtPokemon = selectRandomPokemon(probabilities);
    if (!caughtPokemon) {
        showNotification("합성에 실패했습니다. 재료가 반환됩니다.", "error");
        synthesisSelection.forEach(key => { data.pokedex[key].count++; });
        saveData();
        renderAll();
        return;
    }

    const isShiny = Math.random() < (data.probabilityConfig.shiny[caughtPokemon.rarity] / 100 * 1.5);
    const pokemonKey = `${caughtPokemon.id}_${isShiny ? "shiny" : "normal"}`;
    const isNew = data.pokedex[pokemonKey] === undefined;

    if (data.pokedex[pokemonKey]) {
        data.pokedex[pokemonKey].count++;
    } else {
        data.pokedex[pokemonKey] = { ...caughtPokemon, isShiny: isShiny, count: 1 };
    }
    
    synthesisSelection = [];
    saveData();
    renderAll();
    showCaughtModal(data.pokedex[pokemonKey], isNew);
    showNotification(`${resultRarity} 등급 포켓몬 합성에 성공했습니다!`);
}

// --- 상점 기능 ---
function renderShop() {
    dom.shopSellList.innerHTML = "";
    let sellHTML = "";
    const sellableItems = Object.keys(data.shopConfig.sell);

    sellableItems.forEach(itemKey => {
        const itemInfo = EGG_TYPES[itemKey];
        const price = data.shopConfig.sell[itemKey];
        const userCount = data.inventory[itemKey] || 0;
        const canSell = userCount > 0;

        sellHTML += `
            <div class="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                <div class="flex items-center">
                    <img src="${itemInfo.img}" class="h-8 w-8 mr-3">
                    <div>
                        <p class="font-semibold">${itemInfo.name}</p>
                        <p class="text-sm text-gray-400">보유: ${userCount}개</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                     <span class="font-semibold text-yellow-400">${price} 코인</span>
                    <button data-item-key="${itemKey}" class="sell-btn bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold py-1 px-3 rounded-md ${!canSell ? 'opacity-50 cursor-not-allowed' : ''}" ${!canSell ? 'disabled' : ''}>판매</button>
                </div>
            </div>
        `;
    });
    dom.shopSellList.innerHTML = sellHTML || '<p class="text-gray-500">판매할 아이템이 없습니다.</p>';

    dom.shopBuyList.innerHTML = "";
    let buyHTML = "";
    const buyableItems = Object.keys(data.shopConfig.buy);

    buyableItems.forEach(itemKey => {
        const itemInfo = EGG_TYPES[itemKey];
        const price = data.shopConfig.buy[itemKey];
        const canBuy = data.inventory.coins >= price;

        buyHTML += `
             <div class="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                <div class="flex items-center">
                    <img src="${itemInfo.img}" class="h-8 w-8 mr-3">
                    <p class="font-semibold">${itemInfo.name}</p>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-yellow-400">${price} 코인</span>
                    <button data-item-key="${itemKey}" class="buy-btn bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-md ${!canBuy ? 'opacity-50 cursor-not-allowed' : ''}" ${!canBuy ? 'disabled' : ''}>구매</button>
                </div>
            </div>
        `;
    });
    dom.shopBuyList.innerHTML = buyHTML;
}

function handleShopAction(event, actionType) {
    const button = event.target.closest(actionType === 'sell' ? '.sell-btn' : '.buy-btn');
    if (!button || button.disabled) return;

    const itemKey = button.dataset.itemKey;

    if (actionType === 'sell') {
        if (data.inventory[itemKey] > 0) {
            data.inventory[itemKey]--;
            data.inventory.coins += data.shopConfig.sell[itemKey];
            showNotification(`${EGG_TYPES[itemKey].name} 1개를 판매했습니다.`, "info");
        } else {
            showNotification("판매할 아이템이 부족합니다.", "error");
            return;
        }
    } else if (actionType === 'buy') {
        const price = data.shopConfig.buy[itemKey];
        if (data.inventory.coins >= price) {
            data.inventory.coins -= price;
            data.inventory[itemKey]++;
            showNotification(`${EGG_TYPES[itemKey].name} 1개를 구매했습니다.`, "info");
        } else {
            showNotification("코인이 부족합니다.", "error");
            return;
        }
    }

    saveData();
    renderAll();
}


// --- 모달 및 알림 ---
function handleCompareToggle() {
    if (!pokemonForComparison) return;

    const isCurrentlyShiny = dom.pokemonImage.src.includes('/shiny/');
    const newImageUrl = isCurrentlyShiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonForComparison.id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonForComparison.id}.png`;

    dom.pokemonImage.src = newImageUrl;
    dom.compareBtn.textContent = isCurrentlyShiny ? '이로치 모습 보기' : '일반 모습 보기';
}

function showCaughtModal(pokemon, isNew, eggType) {
    pokemonForComparison = pokemon;
    dom.pokeballContainer.classList.remove("hidden");
    dom.caughtPokemonInfo.classList.add("hidden");
    const pokeballImg = dom.pokeballContainer.querySelector("img");
    
    pokeballImg.src = (eggType && EGG_TYPES[eggType]) ? EGG_TYPES[eggType].img : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

    pokeballImg.classList.remove("pokeball-animation");
    dom.modalCaught.classList.remove("hidden");
    setTimeout(() => { pokeballImg.classList.add("pokeball-animation"); }, 100);
    setTimeout(() => {
        dom.pokeballContainer.classList.add("hidden");
        dom.caughtPokemonInfo.classList.remove("hidden");
        
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.isShiny ? 'shiny/' : ''}${pokemon.id}.png`;
        
        dom.pokemonName.innerHTML = `${pokemon.name} ${pokemon.isShiny ? '<span class="shiny-text">✨</span>' : ''}`;
        dom.pokemonImage.src = imageUrl;
        dom.pokemonId.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
        dom.pokemonRarity.textContent = pokemon.rarity;
        dom.pokemonRarity.className = `px-3 py-1 text-sm font-semibold text-white rounded-full ${RARITY_STYLES[pokemon.rarity]}`;
        dom.pokemonIsNew.textContent = isNew ? (pokemon.isShiny ? "✨ 새로운 이로치 포켓몬! ✨" : "✨ 새로운 포켓몬! ✨") : (pokemon.isShiny ? "이로치 포켓몬을 또 잡았다!" : "이미 잡은 포켓몬입니다.");
        
        if (pokemon.isShiny) {
            dom.compareBtn.classList.remove('hidden');
            dom.compareBtn.textContent = '일반 모습 보기';
        } else {
            dom.compareBtn.classList.add('hidden');
        }
    }, 1500);
}

function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    const bgColor = type === "error" ? "bg-red-500" : "bg-blue-500";
    notification.className = `fixed bottom-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg z-50 ${bgColor}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 3000);
}

// --- 탭 전환 ---
function switchMainTab(tabName) {
    const isPokedex = tabName === 'pokedex';
    dom.pokedexView.classList.toggle('hidden', !isPokedex);
    dom.shopView.classList.toggle('hidden', isPokedex);
    dom.mainTabPokedex.classList.toggle('border-blue-500', isPokedex);
    dom.mainTabPokedex.classList.toggle('text-white', isPokedex);
    dom.mainTabPokedex.classList.toggle('text-gray-500', !isPokedex);
    dom.mainTabShop.classList.toggle('border-blue-500', !isPokedex);
    dom.mainTabShop.classList.toggle('text-white', !isPokedex);
    dom.mainTabShop.classList.toggle('text-gray-500', isPokedex);
}

// --- 관리자 페이지 기능 ---
function openAdminPage() {
    dom.appContainer.classList.add('hidden');
    dom.adminPage.classList.remove('hidden');
    renderAdminPage();
}

function closeAdminPage() {
    dom.adminPage.classList.add('hidden');
    dom.appContainer.classList.remove('hidden');
}

function renderAdminPage() {
    dom.adminPasswordSetting.value = data.completionPassword;

    dom.adminDailyTodoSettings.innerHTML = data.dailyTodos.map((todo, index) => `
        <div class="flex items-center gap-2">
            <input type="text" value="${todo}" data-index="${index}" class="admin-daily-todo-item flex-grow bg-gray-700 text-white rounded-lg px-3 py-1">
            <button data-index="${index}" class="admin-remove-daily-todo-btn bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg">-</button>
        </div>
    `).join('');
    
    let inventoryHTML = `<h4 class='font-bold text-lg mb-2'>아이템 수량</h4>`;
    inventoryHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="inv-edit-coins">코인</label><input type="number" id="inv-edit-coins" value="${data.inventory.coins}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    for (const eggType in EGG_TYPES) {
        inventoryHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="inv-edit-${eggType}">${EGG_TYPES[eggType].name}</label><input type="number" id="inv-edit-${eggType}" value="${data.inventory[eggType]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    dom.adminInventorySettings.innerHTML = inventoryHTML;

    let rewardHTML = `<h4 class='font-bold text-lg mb-2'>알 획득 확률 (%)</h4>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-reward-normal">포켓몬 알</label><input type="number" step="0.1" id="prob-reward-normal" value="${data.rewardProbabilities.normal}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-reward-rare">레어 포켓몬 알</label><input type="number" step="0.1" id="prob-reward-rare" value="${data.rewardProbabilities.rare}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-reward-epic">에픽 포켓몬 알</label><input type="number" step="0.1" id="prob-reward-epic" value="${data.rewardProbabilities.epic}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    rewardHTML += `<h4 class='font-bold text-lg mt-4 mb-2'>천장 시스템</h4>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="pity-threshold">천장 횟수 (일반 알 연속)</label><input type="number" id="pity-threshold" value="${data.pitySystemConfig.threshold}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    dom.adminRewardSettings.innerHTML = rewardHTML;

    let shopHTML = "<h4 class='font-bold text-lg mb-2'>판매 가격</h4>";
    for (const item in data.shopConfig.sell) {
        shopHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="price-sell-${item}">${EGG_TYPES[item].name}</label><input type="number" id="price-sell-${item}" value="${data.shopConfig.sell[item]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    shopHTML += "<h4 class='font-bold text-lg mt-4 mb-2'>구매 가격</h4>";
    for (const item in data.shopConfig.buy) {
        shopHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="price-buy-${item}">${EGG_TYPES[item].name}</label><input type="number" id="price-buy-${item}" value="${data.shopConfig.buy[item]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    dom.adminShopSettings.innerHTML = shopHTML;
    
    let probHTML = "<h4 class='font-bold text-lg mb-2'>알 부화 확률</h4>";
    for (const eggType in data.probabilityConfig) {
        if (eggType === 'shiny') continue;
        probHTML += `<div class="p-2 bg-gray-800 rounded mb-2"><p class="font-semibold text-yellow-300">${EGG_TYPES[eggType].name}</p>`;
        for (const rarity in data.probabilityConfig[eggType]) {
            probHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-${eggType}-${rarity}">${rarity}</label><input type="number" step="0.1" id="prob-${eggType}-${rarity}" value="${data.probabilityConfig[eggType][rarity]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
        }
        probHTML += "</div>";
    }
    probHTML += "<h4 class='font-bold text-lg mt-4 mb-2'>이로치 등장 확률</h4>";
    for (const rarity in data.probabilityConfig.shiny) {
        probHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-shiny-${rarity}">${rarity}</label><input type="number" step="0.01" id="prob-shiny-${rarity}" value="${data.probabilityConfig.shiny[rarity]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    dom.adminProbabilitySettings.innerHTML = probHTML;

    dom.adminPokemonList.innerHTML = "";
    [...POKEMON_DATA].sort((a,b) => a.id - b.id).forEach(pokemon => {
        const keyNormal = `${pokemon.id}_normal`, keyShiny = `${pokemon.id}_shiny`;
        const countNormal = data.pokedex[keyNormal]?.count || 0, countShiny = data.pokedex[keyShiny]?.count || 0;
        const itemDiv = document.createElement("div");
        itemDiv.className = "admin-item grid grid-cols-3 gap-4 items-center p-2 bg-gray-700 rounded-lg mb-2";
        itemDiv.dataset.keyNormal = keyNormal;
        itemDiv.dataset.keyShiny = keyShiny;
        itemDiv.innerHTML = `<div class="flex items-center col-span-1"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="h-8 w-8 mr-2 bg-gray-800 rounded-full"><span class="font-semibold text-sm">#${String(pokemon.id).padStart(3, '0')} ${pokemon.name}</span></div><div class="flex items-center gap-2"><label for="count-${keyNormal}" class="text-sm text-gray-400">일반:</label><input type="number" id="count-${keyNormal}" value="${countNormal}" min="0" class="w-16 bg-gray-900 rounded p-1 text-center"></div><div class="flex items-center gap-2"><label for="count-${keyShiny}" class="text-sm text-yellow-300">이로치:</label><input type="number" id="count-${keyShiny}" value="${countShiny}" min="0" class="w-16 bg-gray-900 rounded p-1 text-center"></div>`;
        dom.adminPokemonList.appendChild(itemDiv);
    });
}

function handleAdminAddDailyTodo() {
    const newTodoText = dom.adminNewDailyTodoInput.value.trim();
    if (newTodoText) {
        data.dailyTodos.push(newTodoText);
        dom.adminNewDailyTodoInput.value = '';
        renderAdminPage();
    }
}

function handleAdminEditOrRemoveDailyTodo(event) {
    if (event.target.matches('.admin-remove-daily-todo-btn')) {
        const indexToRemove = parseInt(event.target.dataset.index, 10);
        data.dailyTodos.splice(indexToRemove, 1);
        renderAdminPage();
    }
}

function saveAdminChanges() {
    data.completionPassword = dom.adminPasswordSetting.value.trim();

    const newDailyTodos = [];
    document.querySelectorAll('.admin-daily-todo-item').forEach(input => {
        const text = input.value.trim();
        if (text) newDailyTodos.push(text);
    });
    data.dailyTodos = newDailyTodos;
    const currentDailyIds = data.dailyTodos.map((_, index) => `daily_${index}`);
    Object.keys(data.todos).forEach(key => {
        if (data.todos[key].isDaily && !currentDailyIds.includes(key)) {
            delete data.todos[key];
        }
    });
    data.dailyTodos.forEach((text, index) => {
        const id = `daily_${index}`;
        if (data.todos[id]) {
            data.todos[id].text = text;
        } else {
            data.todos[id] = { text, completed: false, isDaily: true };
        }
    });

    for (const eggType in data.probabilityConfig) {
        if (eggType === 'shiny') {
            for (const rarity in data.probabilityConfig.shiny) data.probabilityConfig.shiny[rarity] = parseFloat(document.getElementById(`prob-shiny-${rarity}`).value) || 0;
        } else {
            for (const rarity in data.probabilityConfig[eggType]) data.probabilityConfig[eggType][rarity] = parseFloat(document.getElementById(`prob-${eggType}-${rarity}`).value) || 0;
        }
    }
    for (const item in data.shopConfig.sell) data.shopConfig.sell[item] = parseInt(document.getElementById(`price-sell-${item}`).value, 10) || 0;
    for (const item in data.shopConfig.buy) data.shopConfig.buy[item] = parseInt(document.getElementById(`price-buy-${item}`).value, 10) || 0;
    data.rewardProbabilities.normal = parseFloat(document.getElementById('prob-reward-normal').value) || 0;
    data.rewardProbabilities.rare = parseFloat(document.getElementById('prob-reward-rare').value) || 0;
    data.rewardProbabilities.epic = parseFloat(document.getElementById('prob-reward-epic').value) || 0;
    data.pitySystemConfig.threshold = parseInt(document.getElementById('pity-threshold').value, 10) || 30;
    data.inventory.coins = parseInt(document.getElementById('inv-edit-coins').value, 10) || 0;
    for (const eggType in EGG_TYPES) data.inventory[eggType] = parseInt(document.getElementById(`inv-edit-${eggType}`).value, 10) || 0;
    const newPokedex = {};
    document.querySelectorAll(".admin-item").forEach(item => {
        const keyNormal = item.dataset.keyNormal, keyShiny = item.dataset.keyShiny;
        const countNormal = parseInt(item.querySelector(`#count-${keyNormal}`).value, 10);
        const countShiny = parseInt(item.querySelector(`#count-${keyShiny}`).value, 10);
        if (countNormal > 0) {
            const basePokemon = POKEMON_DATA.find(p => p.id == keyNormal.split('_')[0]);
            if (basePokemon) newPokedex[keyNormal] = { ...basePokemon, isShiny: false, count: countNormal };
        }
        if (countShiny > 0) {
            const basePokemon = POKEMON_DATA.find(p => p.id == keyShiny.split('_')[0]);
            if (basePokemon) newPokedex[keyShiny] = { ...basePokemon, isShiny: true, count: countShiny };
        }
    });
    data.pokedex = newPokedex;
    saveData();
    renderAll();
    closeAdminPage();
    showNotification("관리자 설정이 저장되었습니다.");
}

// --- 애플리케이션 시작 ---
function main() {
    loadData();
    setupUI();
    setupListeners();
    renderAll();
}

document.addEventListener('DOMContentLoaded', main);
