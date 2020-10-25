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
        },
        {
            // Room does not exist 20
            npcs: [],
            items: [],
        },
    ],
    [
        /* 0 1 */ {
            npcs: [],
            items: [],
        },
        // 11
        {
            npcs: [
                {
                    x: 800,
                    y: 180,
                    name: 'aunt',
                    scriptKey: 'meetAunt',

                }
            ],
            items: [],
        },
        {
            // Room does not exist 21
            npcs: [],
            items: [],
        },
    ],
    [
        {
            // Room does not exist 02
            npcs: [],
            items: [],
        },
        {// 12
            npcs: [
                {
                    x: 500,
                    y: 185,
                    name: 'grandpa',
                    scriptKey: 'meetGrandpa',
                }
            ],
            items: [],
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
        },
    ],
    [
        {
            // Room does not exist 03
            npcs: [],
            items: [],
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
        },
        {// 23
            npcs: [],
            items: [],
        },
    ],
];

export default levels;



