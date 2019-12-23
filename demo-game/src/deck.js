function shuffle(array) {
    const _array = array.slice(0)
    for (let i =0; i < array.length - 1; i++ ){
        let randomIndex = Math.floor(Math.random() * (i + 1))
        //swap after shuffle
        let temp = _array[i]
        _array[i] = _array[randomIndex]
        _array[randomIndex] = temp
    }
    return _array
}

export default function initializeDeck(){
    let id = 0
    const cards = ['adidas', 'android','apple', 'chick-fil-a','disney',
    'facebook','gmail','hp','instagram','line','linkedin','mastercard',
    'tesla','tiktok', 'twitter','ups','whatsapp','youtube'
        ].reduce((acc, type) => {
        acc.push({
            id: id++,
            type
        })
        acc.push({
            id: id++,
            type
        })
        return acc
    }, [])
    return shuffle(cards)
}
