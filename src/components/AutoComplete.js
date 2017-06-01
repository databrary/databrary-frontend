/**
 * Created by maksim on 6/1/17.
 */


import React, {PureComponent} from "react";
import Autocomplete from "react-md/lib/Autocompletes";

const pastries = [
    'Aloo pie',
    'Apple pie',
    'Apple strudel',
    'Bakewell pudding',
    'Baklava',
    'Bakpia Pathok',
    'Banbury cake',
    'Banitsa',
    'Banket',
    'Bear claw',
    'Berliner',
    'Bethmännchen',
    'Bichon au citron',
    'Bierock',
    'Birnbrot',
    'Bizcocho',
    'Börek',
    'Bossche bol',
    'Bougatsa',
    'Boyoz',
    'Briouat',
    'Bruttiboni',
    'Bundevara',
    'Burek',
    'Canelé',
    'Cannoli',
    'Carac',
    'Chatti Pathiri',
    'Cherry pie',
    'Chorley cake',
    'Chouquette',
    'Chou à la crème',
    'Cinnamon Roll',
    'Coca',
    'Conejito',
    'Cornish pasty',
    'Conversation',
    'Coussin de Lyon',
    'Cream horn',
    'Crocetta of Caltanissetta',
    'Croissant',
    'Cronut',
    'Croquembouche',
    'Cuban pastry',
    'Curry puff',
    'Dabby-Doughs',
    'Danish pastry',
    'Djevrek',
    'Dutch letter',
    'Eccles cake',
    'Éclair',
    'Empanada',
    'Ensaïmada',
    'Fa gao',
    'Fig roll',
    'Flaky pastry',
    'Flaons',
    'Flies graveyard',
    'Franzbrötchen',
    'Galette',
    'Gâteau Basque',
    'Gibanica',
    'Gujiya',
    'Gözleme',
    'Gulab jamun',
    'Gustavus Adolphus pastry',
    'Gyeongju bread',
    'Haddekuche',
    'Hamantash',
    'Heong Peng',
    'Jachnun',
    'Jalebi',
    'Jesuite',
    'Joulutorttu',
    'Kalács',
    'Kanafeh',
    'Kifli',
    'Klobasnek',
    'Knieküchle',
    'Kolache',
    'Kolompeh',
    'Kołacz',
    'Komaj sehen',
    'Kouign-amann',
    'Krempita',
    'Kringle',
    'Kroštule',
    'Kūčiukai',
    'Kürtőskalács',
    'Lattice',
    'Leipziger Lerche',
    'Linzer torte',
    'Lotus seed bun',
    'Ma\'amoul',
    'Macarons',
    'Makroudh',
    'Malsouka',
    'Mandelkubb',
    'Mantecadas',
    'Marillenknödel',
    'Marry girl cake',
    'Mazarin',
    'Miguelitos',
    'Milhoja',
    'Milk-cream strudel',
    'Mille-feuille',
    'Mooncake',
    'Moorkop',
    'Muskazine',
    'Nazook',
    'Nun\'s puffs',
    'Öçpoçmaq',
    'Ox-tongue pastry',
    'Pain au chocolat',
    'Pain aux raisins',
    'Palmier',
    'Pan dulce',
    'Panzarotti',
    'Papanași',
    'Paper wrapped cake',
    'Paris–Brest',
    'Pastel',
    'Pastizz',
    'Pastry heart',
    'Pâté Chaud',
    'Pecan pie',
    'Filo[clarification needed]',
    'Pie',
    'Pineapple bun',
    'Pionono',
    'Pithivier',
    'Plăcintă',
    'Pogača',
    'Poppy seed roll',
    'Pot pie',
    'Prekmurska gibanica',
    'Pretzel',
    'Profiterole',
    'Puff pastry',
    'Punsch-roll',
    'Punschkrapfen',
    'Qottab',
    'Quesito',
    'Remonce',
    'Rhubarb tart',
    'Rollò',
    'Roti tissue',
    'Roze koek',
    'Rugelach',
    'Runeberg\'s torte',
    'Rustico',
    'Samosa',
    'Schaumrolle',
    'Schnecken',
    'Schneeball',
    'Schuxen',
    'Semla',
    'Sfenj',
    'Sfogliatelle',
    'Shortcrust pastry',
    'Sou',
    'Spanakopita',
    'Spina santa',
    'Streusel',
    'Strudel',
    'Stutenkerl',
    'Sufganiyah',
    'Sweetheart cake',
    'Taiyaki',
    'Toaster pastry',
    'Torpil',
    'Tortell',
    'Tortita negra',
    'Trdelník',
    'Turnover',
    'Utap',
    'Vatrushka',
    'Vetkoek',
    'Viennoiserie',
    'Vol-au-vent',
    'Xuixo',
    'Zeeuwse bolus',
    'Zlebia',
];
export default class SearchToolbarExample extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            searching: false,
            value: '',
        };

        this._showSearch = this._showSearch.bind(this);
        this._hideSearch = this._hideSearch.bind(this);
        this._resetSearch = this._resetSearch.bind(this);
        this._handleSearchChange = this._handleSearchChange.bind(this);
    }

    _showSearch() {
        this.setState({searching: true});
    }

    _hideSearch() {
        this.setState({searching: false});
    }

    _resetSearch() {
        this.setState({value: ''});
    }

    _handleSearchChange(value) {
        this.setState({value});
    }

    render() {

        return <Autocomplete
            id="searchExamle"
            label="I love cake"
            required
            customSize="title"
            size={10}
            paddedBlock={false}
            data={pastries}
            value={this.state.value}
            onAutocomplete={this._handleSearchChange}
            onChange={this._handleSearchChange}
            className="md-cell md-cell--6"
            inputClassName="md-text-field--toolbar"
        />
    }
}