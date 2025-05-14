class perfume {
    constructor (id, name, designer, size, price, family, type, notes, na){
        this.id = id;
        this.img = img;
        this.name = name;
        this.designer = designer;
        this.size = size;
        this.price = price;
        this.family = family;
        this.type = type;
        this.notes = notes;
        this.na = na;
    }
}

const ScentList = [
    {
        id: 1,
        name: "Lost Cherry Eau de Parfum Fragrance",
        designer: "Tom Ford",
        size: 3.4,
        price: 615.00,
        family: "Warm & Spicy",
        type: "Warm & Sweet Gourmands",
        notes: "Black Cherry, Tonka Bean, Almond",
    },
    {
        id: 2,
        name: "Donna Born In Roma Eau de Parfum",
        designer: "Valentino",
        size: 1.7,
        price: 140.00,
        family: "Floral",
        type: "Warm Florals",
        notes: "Blackcurrant, Jasmine Grandiflorum, Bourbon Vanilla",
    },
    {
        id: 3,
        name: "Mon Paris Eau de Parfum",
        designer: "Yves Saint Laurent",
        size: 1.6,
        price: 120.00,
        family: "Floral",
        type: "Fruity Floral",
        notes: "Datura Flower, Patchouli, Red Berries",
    }
]
 
export default ScentList
