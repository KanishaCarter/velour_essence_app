class Perfume {
    constructor (id, name, designer, size, price, family, type, notes){
        this.id = id;
        this.name = name;
        this.designer = designer;
        this.size = size;
        this.price = price;
        this.family = family;
        this.type = type;
        this.notes = notes;
    }
}

const ScentList = [
    new Perfume(1, "Lost Cherry Eau de Parfum Fragrance", "Tom Ford", 3.4, 615.00, "Warm & Spicy", "Warm & Sweet Gourmands", "Black Cherry, Tonka Bean, Almond"),
    new Perfume(2, "Donna Born In Roma Eau de Parfum", "Valentino", 1.7, 140.00, "Floral", "Warm Florals", "Blackcurrant, Jasmine Grandiflorum, Bourbon Vanilla"),
    new Perfume(3, "Mon Paris Eau de Parfum", "Yves Saint Laurent", 1.6, 120.00, "Floral", "Fruity Floral", "Datura Flower, Patchouli, Red Berries"),
];


 
export default ScentList
