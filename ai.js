let maximizingChar;

export function checkGame(state, char) {
    for(let indexes of ["012", "345", "678", "036", "147", "258", "048", "246"]){
        const cellA = state[indexes[0]];
        const cellB = state[indexes[1]];
        const cellC = state[indexes[2]];
        if(cellA !== '-' && cellA === cellB && cellB === cellC){
            return cellA === char ? 1 : -1;
        }
    }
    return state.includes('-') ? null : 0;
}

export function updateState(state, index, char) {
    return state.slice(0, index) + char + state.slice(index+1);
}

export function findBestMove(givenState, computersChar) {

    const children = findChildren(givenState, computersChar);
    if(children.length === 1) return emptyIndexes(givenState)[0];
    const avaliableIndexes = emptyIndexes(givenState);

    maximizingChar = computersChar;

    let bestScore = -Infinity;
    let bestMove;

    for(let i = 0; i < avaliableIndexes.length; i++){
        const score = minimax(children[i], -Infinity, Infinity, false);
        if(score > bestScore){
            bestScore = score;
            bestMove = avaliableIndexes[i];
        }
    }

    return bestMove;

}

function minimax(state, alpha, beta, isMaximizing) {
    
    const stateValue = checkGame(state, maximizingChar);
    if(stateValue !== null) return stateValue;

    if(isMaximizing){
        let bestScore = -Infinity;
        for(const child of findChildren(state, maximizingChar)){
            const score = minimax(child, alpha, beta, false);
            bestScore = Math.max(bestScore, score);
            alpha = Math.max(alpha, score);
            if(beta <= alpha) break;
        }
        return bestScore;
    }
    let bestScore = Infinity;
    for(const child of findChildren(state, maximizingChar === 'X' ? 'O' : 'X')){
        const score = minimax(child, alpha, beta, true);
        bestScore = Math.min(bestScore, score);
        beta = Math.min(beta, score);
        if(beta <= alpha) break;
    }
    return bestScore;
    
}

function emptyIndexes(state) {
    return state.split("").map((char, index) => char === '-' ? index : null).filter(item => item !== null);
}

function findChildren(state, char) {
    const newStates = [];
    for(const index of emptyIndexes(state)){
        newStates.push(updateState(state, index, char));
    }
    return newStates;
}
