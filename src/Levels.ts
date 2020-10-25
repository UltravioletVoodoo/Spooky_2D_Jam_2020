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
                {
                    x: 200,
                    y: 200,
                    name: 'aunt',
                    scriptKey: 'meetAunt',
                }
            ],
            items: [
                {
                    x: 300,
                    y: 200,
                    itemKey: 'dogtags'
                },
                {
                    x: 450,
                    y: 200,
                    itemKey: 'locket'
                },
                {
                    x: 600,
                    y: 200,
                    itemKey: 'pocketwatch'
                },
                {
                    x: 750,
                    y: 200,
                    itemKey: 'key'
                },
            ],
        }
    ],
    [
        /* 0 1 */ {
            npcs: [
                {
                    x: 1000,
                    y: 500,
                    name: 'grandpa',
                    scriptKey: 'meetGrandpa',
                },
                {
                    x: 800,
                    y: 550,
                    name: 'sister',
                    scriptKey: 'meetSister',
                },
            ],
            items: [],
        },
    ],
];

export default levels;



