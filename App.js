// // APLIKACJA, WERSJA 1:
// // - WPISUJEMY KWOTĘ W ZŁOTÓWKACH, A APKA PRZELICZA NAM NA DOLARY I EURO


// const Cash = (props) => (
//     <div> {props.title} {props.cash <= 0 ? "" : (props.cash / props.ratio).toFixed(2)} </div>
//     // za pomocą metody 'toFixed' zaokrąglamy liczbę do dwóch miejsc po przecinku ORAZ sprawdzamy, czy zmienna cash przechowuje liczbę <= 0 - jeżeli tak, to ma nam zwrócić pusty string, natomiast jeżeli nie to ma się wykonać powyższy kod
// )

// class ExchangeCounter extends React.Component {
//     state= {
//         amount: "", 
//     }

//     currencies= [
//         { 
//             id: 1,
//             name: "dollar",
//             ratio: 3.6,
//             title: "Wartość w dolarach:"
//         },
//         {
//             id: 2,
//             name: "euro",
//             ratio: 4.7,
//             title: "Wartość w euro:"
//         },
//         {
//             id: 3,
//             name: "pound",
//             ratio: 5.33,
//             title: "Wartość w funtach:"
//         },
//     ]

//     handleChange = (e) => {
//         this.setState({
//             amount: e.target.value
//         })
//     }

//     render() {

//         const {amount} = this.state;

//         const calculators = this.currencies.map( (currency) => (
//             <Cash key={currency.id} ratio={currency.ratio} title={currency.title} cash={amount} />
//         ))

//         return (
//             <div className="app">
//                 <label>
//                     <input 
//                         type="number" 
//                         value={this.state.amount} 
//                         onChange={this.handleChange} 
//                     />
//                 </label>
//                 {calculators}
//             </div>
//         )
//     }
// }

// ReactDOM.render(<ExchangeCounter/>, document.getElementById('root'))




// ---------------------------------------------------------------------------------------------------------------------------------------



// APLIKACJA, WERSJA 2:
// - WYBIERAMY PRODUKT, WPISUJEMY JEGO ILOŚĆ, A APKA PRZELICZA NAM ILE ZA TO MUSIMY ZAPŁACIĆ W RÓŻNYCH WALUTACH


const Cash = (props) => (
    <div> {props.title} {props.cash <= 0 ? "" : (props.cash / props.ratio * props.price).toFixed(2)} </div>
    // za pomocą metody 'toFixed' zaokrąglamy liczbę do dwóch miejsc po przecinku ORAZ sprawdzamy, czy zmienna cash przechowuje liczbę <= 0 - jeżeli tak, to ma nam zwrócić pusty string, natomiast jeżeli nie to ma się wykonać powyższy kod
)

class ExchangeCounter extends React.Component {

    state = {
        amount: "", 
        product: "electricity"
    }

    static defaultProps = {
        currencies : [
            { 
                id: 0,
                name: "zloty",
                ratio: 1,
                title: "Wartość w złotówkach:"
            },
            { 
                id: 1,
                name: "dollar",
                ratio: 3.6,
                title: "Wartość w dolarach:"
            },
            {
                id: 2,
                name: "euro",
                ratio: 4.7,
                title: "Wartość w euro:"
            },
            {
                id: 3,
                name: "pound",
                ratio: 5.33,
                title: "Wartość w funtach:"
            },
        ],
        prices: {
            electricity: .51,
            gas: 6.66,          
            oranges: 4.3
        }
    }
    // właściwość "static" po wyżej to standardowa właściwość do przetrzymywania wartości domyślnych w react. Te właściowości są tworzone o ile nie przekarzemy własnych props

    handleChange = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    handleSelect = (e) => {
        this.setState({
            product: e.target.value,
            amount: ""
        })
    }

    insertSuffix(select) {
        if (select === "electricity") return <em>kWh</em>
        else if (select === "gas") return <em>litrów</em>
        else if (select === "oranges") return <em>kilogramów</em>
        else return null
    }

    selectPrice (select) {
        const price = this.props.prices[select]
        return price

    }

    render() {

        const {amount, product} = this.state;

        const calculators = this.props.currencies.map( (currency) => (
            <Cash key={currency.id} ratio={currency.ratio} title={currency.title} cash={amount} price={this.selectPrice(product)} />
        ))

        return (
            <div className="app">
                <label> 
                    Wybierz produkt:
                    <select value={product} onChange={this.handleSelect} >
                        <option value="electricity">prąd</option>
                        <option value="gas">benzyna</option>
                        <option value="oranges">pomarańcze</option>
                    </select>
                </label>
                <br />
                <label>
                    <input 
                        type="number" 
                        value={this.state.amount} 
                        onChange={this.handleChange} 
                    />
                    {this.insertSuffix(this.state.product)}
                </label>
                {calculators}
            </div>
        )
    }
}

ReactDOM.render(<ExchangeCounter/>, document.getElementById('root'))
