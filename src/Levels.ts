interface Level {
    npcs: {
        x: number,
        y: number,
        name: string,
        scriptKey: string,
    }[],
    items: {
        x: number,
        y: number,
        itemKey: string,
        scriptKey?: string,
    }[],
    enemies: {
        x: number,
        y: number
    }[],
}

const levels: Level[][] = [
    [
        /* 0 0 */ {
            npcs: [

            ],
            items: [
                {
                    x: 192,
                    y: 567,
                    itemKey: 'dogtags'
                },
            ],
            enemies: []
        },
        {
            // 10
            npcs: [],
            items: [
                {
                    x: 251,
                    y: 388,
                    itemKey: 'pocketwatch'
                }
            ],
            enemies: []
        },
        {
            // Room does not exist 20
            npcs: [],
            items: [],
            enemies: []
        },
    ],
    [
        /* 0 1 */ {
            npcs: [],
            items: [],
            enemies: [
                {
                    x: 250,
                    y: 250,
                }
            ]
        },
        // 11
        {
            npcs: [
                {
                    x: 800,
                    y: 180,
                    name: 'aunt',
                    scriptKey: 'meetAunt',

                },
                {
                    x: 700,
                    y: 620,
                    name: 'gloom',
                    scriptKey: 'meetGloom'
                }
            ],
            items: [],
            enemies: []
        },
        {
            // Room does not exist 21
            npcs: [],
            items: [],
            enemies: []
        },
    ],
    [
        {
            // Room does not exist 02
            npcs: [],
            items: [],
            enemies: []
        },
        {// 12
            npcs: [
                {
                    //x: 500,
                    x: 750,
                    y: 185,
                    name: 'grandpa',
                    scriptKey: 'meetGrandpa',
                },
                {
                    x: 140,
                    y: 500,
                    name: 'gloom',
                    scriptKey: 'returnToGloom'
                }
            ],
            items: [],
            enemies: []
        },
        {// 22
            npcs: [],
            items: [
                {
                    x: 1100,
                    y: 150,
                    itemKey: 'mothersCharm',
                }
            ],
            enemies: []
        },
    ],
    [
        {
            // Room does not exist 03
            npcs: [],
            items: [],
            enemies: []
        },
        { // 13
            npcs: [
                {
                    x: 440,
                    y: 255,
                    name: 'sister',
                    scriptKey: 'meetSister',
                }
            ],
            items: [],
            enemies: []
        },
        {// 23
            npcs: [
                {
                    x: 950,
                    y: 340,
                    name: 'gloom',
                    scriptKey: 'leaveGloom'
                }
            ],
            items: [],
            enemies: []
        },
    ],
];

export default levels;



