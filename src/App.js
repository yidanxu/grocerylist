import React, {useState} from 'react';

import Header from './components/Header/index';
import DataInput from './components/DataInput';
import SelectionBar from'./components/SelectionBar';
import DataOutput from './components/DataOutput';
import './App.css';



const App = () =>{
    const [thisList, setThisList] = useState( [])

    const addItem=(userInput) => {
        let copy = [...thisList];
        copy = [...copy, {itemId:thisList.length,itemName:userInput,itemQuantity:1,itemSelected:false}];
        setThisList(copy);

    }


    const sortArray = (type) => {
        console.log("here is the type");
        console.log(type);
        const types = {
            'Unfinished to Finished':'itemSelected'
        };

        const sortProperty = types[type];
        console.log("here is the property");
        console.log(sortProperty);
        const sorted = [...thisList].sort((a, b) => a[sortProperty] - b[sortProperty]);
        setThisList(sorted);
        console.log("here is the sorted list")
        console.log(sorted);

    }

    const handleDeleteItem = (id) =>{
        let copy = [...thisList];
        copy = copy.length===1?[]:copy.filter(item =>item.itemId !==copy[id].itemId);
        setThisList(copy);
    }

    const handleQuantityIncrease = (id) =>{
        let copy = [...thisList];
        copy[id].itemQuantity++;
        console.log(id);
        console.log(copy[id].itemQuantity);
        setThisList(copy);
    }

    const handleQuantityDecrease = (id) =>{
        let copy = [...thisList];
        copy[id].itemQuantity=(copy[id].itemQuantity>1) ? (copy[id].itemQuantity-1) : 1
        //copy[id].itemQuantity=copy[id].itemQuantity-1
        console.log(id);
        console.log(copy[id].itemQuantity);
        setThisList(copy);
    }


    const handleSelected = (id) =>{
        let copy = [...thisList];
        copy[id].itemSelected = !copy[id].itemSelected;
        setThisList(copy);
    }


    const handleOnDragEnd =(result)=> {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) {
            return;
        }

        const items = Array.from(thisList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setThisList(items);
    }





    return(
        <React.Fragment>
            <Header />
            <main>
                <DataInput addItem ={addItem} />
                <SelectionBar sortArray = {sortArray}/>
                <DataOutput thisList={thisList} handleQuantityIncrease = {handleQuantityIncrease}
                            handleQuantityDecrease = {handleQuantityDecrease}
                            handleSelected ={handleSelected}
                            handleOnDragEnd ={handleOnDragEnd}
                            handleDeleteItem = {handleDeleteItem}
                            />
            </main>
        </React.Fragment>
    )


};



export default App;
