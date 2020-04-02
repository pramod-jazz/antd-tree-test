import React from 'react';
import { Tree, Input } from 'antd';

const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
const gData = [];
let searchedParents = [];
const treeData = [
    {
      title: 'Family',
      key: 'Family',
      children: [
        {
          title: 'prashant',
          key: 'prashant',
          parentKey : 'Family',
      
          children: [
            {
              title: 'pramod',
              key: 'pramod',
              parentKey : 'prashant'
          
            },
            {
              title: 'nikam',
              key: 'nikam',
              parentKey : 'prashant'
            },
          ],
        },
       
        {
            title: 'Siddharth',
            key: 'Siddharth',
            parentKey : 'Family',
            children: [{ title: 'Sourabh', key: 'Sourabh' , parentKey: 'Siddharth' }, {
                title: 'pravin',
                key: 'pravin',
                parentKey : 'Siddharth'
            
              },],
          },
          {
            title: 'Geeta',
            key: 'Geeta',
            parentKey : 'Family',
            children: [{ title: 'Shraddha', key: 'Shraddha' , parentKey: 'Geeta' }],
          },
      ],
    },
  ];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = []; 
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key , parentKey} = node;
    dataList.push({ key, title: key , parentKey : parentKey });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(treeData);



const getExpandsList = (parentKey, list) => {
  
    console.log(">>> recusrsion In iteration list parentKey",parentKey);  
    console.log(">>> recusrsion In iteration list ",dataList);
    //expands.push(1);
    for (let i = 0; i < list.length; i++) {
        if(list[i].key && list[i].key ===  parentKey ){
        
          searchedParents.push(list[i].key);

          if(list[i].parentKey){
              console.log(">>> In recusrsion");
              getExpandsList(list[i].parentKey,list);
          }else{
            console.log(">>> In else");
              
          }
              
        } 
    }


};


class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  onExpand = expandedKeys => {
     console.log(">>> on expand"); 
    this.setState({
      expandedKeys,
      autoExpandParent: true,
    });
  };

 
  retrieveNodes = searchKeyword => {

      return dataList.filter(item => item && (item.key.indexOf(searchKeyword) !== -1)  );
  }
  
  onChange = e => {

 
    const { value } = e.target;

    
    // Getting back list of matched nodes by keyword in Search
    const searchTargets = this.retrieveNodes(value);


    const expands = [];
    searchedParents = [];
    const expandedKeys = searchTargets    
     .map(item => {
        getExpandsList(item.key,dataList ); 
    });

    console.log("list of matched expanded keys by query",searchedParents);

    this.setState({
        expandedKeys: searchedParents,
               searchValue: value,
               autoExpandParent: true,
     });

  };

  render() {

    console.log(">>>>> rendering");
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    expandedKeys.push("Family","Kalyani")
    console.log(">>> expanded keys in render " , expandedKeys);
    const loop = data =>
      data.map(item => {
          console.log(">>> auto expand parent in render" , autoExpandParent);
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
        if (item.children) {
          return { title, key: item.key, parentKey : item.parentKey , children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
          parentKey : item.parentKey

        };
      });
      console.log("in last return");
    return (
     
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          treeData={loop(treeData)}
        />
      </div>
    );
  }
}

export default SearchTree;