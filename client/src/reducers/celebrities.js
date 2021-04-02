export default (celebrity = [], action)=> {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;

        case 'CREATE':
            return celebrity;
    
        default:
            return celebrity;
    }
}