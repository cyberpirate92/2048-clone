interface TileStyle {
    background: string;
    color: string;
}

interface ObjectWrapper<E> {
    [x: string]: E
}

export const TILE_STYLES: ObjectWrapper<TileStyle> = Object.freeze({
    '0': {
        background: '#9b9289',
        color: ''
    },
    '2': {
        background: '#eee4da',
        color: '#776e65',
    },
    '4': {
        background: '#ede0c8',
        color: '#776e65',
    },
    '8': {
        color: '#f9f6f2',
        background: '#f2b179',
    },
    '16': {
        color: '#f9f6f2',
        background: '#f59563',
    },
    '32': {
        color: '#f9f6f2',
        background: '#f67c5f',
    },
    '64': {
        color: '#f9f6f2',
        background: '#f65e3b',
    },
    '128': {
        color: '#f9f6f2',
        background: '#edcf72',
    },
    '256': {
        color: '#f9f6f2',
        background: '#edcc61',
    },
    '512': {
        color: '#f9f6f2',
        background: '#edc850',
    },
    '1024': {
        color: '#f9f6f2',
        background: '#edc53f',
    },
    '2048': {
        color: '#f9f6f2',
        background: '#edc22e',
    },
});