interface Level {
    npcs: {
        x: number,
        y: number,
        name: string,
        scriptKey: string,
    }[],
}

export default [
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
            ]
        },
    ],
];

