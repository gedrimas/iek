
module.exports = function Search(data) {

    this.current = data.cur;
    this.pole = data.pol;
    this.feature = data.fe;
    this.collectionType = data.form;


    this.getReg = function()
    {
        switch (this.collectionType) {
            case 'price':
                return new RegExp(`\\s${this.pole}Р.*\\s${this.current}А.*${this.feature}`);
                break;
            case 'abb':
                return new RegExp(`\\s${this.pole}-.*S20[1,2,3,4]\\s${this.feature}${this.current}`);
        }
    }

    this.getCollection = function()
    {
        return this.collectionType;

    }
}