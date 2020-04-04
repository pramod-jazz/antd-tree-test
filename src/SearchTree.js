import React from 'react';
import { Tree, Input } from 'antd';
import {faThumbtack} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";

import { CarryOutOutlined,} from '@ant-design/icons';
const { DirectoryTree } = Tree;

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
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'prashant',
          key: 'prashant',
          icon: <CarryOutOutlined />,
          parentKey : 'Family',
      
          children: [
            {
              title: 'pramod',
              key: 'pramod',
              icon: <CarryOutOutlined />,
              parentKey : 'prashant'
          
            },
            {
                title: 'Tinu',
                key: 'Tinu',
                icon: <CarryOutOutlined />,
                parentKey : 'prashant'
            
              },
            {
              title: 'nikam',
              key: 'nikam',
              icon: <CarryOutOutlined />,
              parentKey : 'prashant'
            },
          ],
        },
       
        {
            title: 'Siddharth',
            key: 'Siddharth',
            icon: <CarryOutOutlined />,
            parentKey : 'Family',
            children: [{ title: 'Sourabh', key: 'Sourabh' , icon: <CarryOutOutlined />,parentKey: 'Siddharth' }, {
                title: 'pravin',
                key: 'pravin',
                icon: <CarryOutOutlined />,
                parentKey : 'Siddharth'
            
              },],
          },
          {
            title: 'Geeta',
            key: 'Geeta',
            icon: <CarryOutOutlined />,
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
const generateList = (data,prevNode) => {
  for (let i = 0; i < data.length; i++) {
     data[i].classesApplied = prevNode ? prevNode.classesApplied + " " + data[i].key : data[i].key; 
    const node = data[i];
    const { key , parentKey} = node;
    dataList.push({ key, title: key , parentKey : parentKey , classesApplied : "lorem" });
    if (node.children) {
      generateList(node.children,node);
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


const setDefaultExpandsToLocalStorage = (key, list) => {
  
    console.log(">>>> Setting up default expand!");
    //expands.push(1);
   let  defaultExpands = localStorage.getItem("defaultExpands"); 
   
   if(defaultExpands){
    let  previousDefaultExpands = JSON.parse(defaultExpands);
    previousDefaultExpands.push(key);
      localStorage.setItem("defaultExpands",JSON.stringify(previousDefaultExpands));

   }else{
       let tempKeys = [];
       tempKeys.push(key);
       localStorage.setItem("defaultExpands",JSON.stringify(tempKeys));
   }


    for (let i = 0; i < list.length; i++) {
        if(list[i].key && list[i].key ===  key ){
        
          searchedParents.push(list[i].key);

          if(list[i].children){
              console.log(">>> In recusrsion");
              getExpandsList(list[i].key,list);
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
    treeData : treeData
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


  onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  OnPinClick = (event, targetKey) => {
      console.log(">>> inside pin");
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    let clickedNodeKey =  targetKey;
    console.log(">>> Node" , clickedNodeKey);

    setDefaultExpandsToLocalStorage(targetKey,dataList);

    this.setState({
        changed :true
    });   

  }

  

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.treeData];
    //const data = treeData;

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      treeData: data,
    });
  };

  componentDidUpdate(){
      console.log(">>> In component did update");

      let defaultExpandsString = localStorage.getItem("defaultExpands");

      if(defaultExpandsString){
        let defaultExpands = JSON.parse(defaultExpandsString);  

        defaultExpands.forEach((item, index, arr) => {
            console.log(">>> Iterating every default expand");
          
               $("."+ item).each(function( index, value ) {
        console.log( index + ": " + value );
        $(this).addClass("pin-search");
      });


      });
    }

  }

  componentDidMount(){
    console.log(">>> In component did mount");

    let defaultExpandsString = localStorage.getItem("defaultExpands");

    if(defaultExpandsString){
      let defaultExpands = JSON.parse(defaultExpandsString);  

      defaultExpands.forEach((item, index, arr) => {
          console.log(">>> Iterating every default expand");
        
             $("."+ item).each(function( index, value ) {
      console.log( index + ": " + value );
      $(this).addClass("pin-search");
    });


    });
  }

}

  render() {

    let defaultExpandsString = localStorage.getItem("defaultExpands");

    let defaultExpands =[];
    if(defaultExpandsString){
      defaultExpands = JSON.parse(defaultExpandsString);  
      console.log(">>>>> default expands", defaultExpands);
    }  

    console.log(">>>>> rendering");
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    
    console.log(">>> expanded keys in render " , expandedKeys);
    const loop = data =>
      data.map(item => {
  
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue} </span> <span className={item.classesApplied}> <FontAwesomeIcon onClick={ (e) => this.OnPinClick(e,item.key)} icon={faThumbtack}  /> </span>
            {afterStr} 
          </span>
        ) : (
          <span><span><span>{item.title}</span>    </span><span className={item.classesApplied}> <FontAwesomeIcon onClick={ (e) => this.OnPinClick(e,item.key)}    icon={faThumbtack}  /></span></span>
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

      let expands = [...this.state.expandedKeys];
       let allExpands = expands.concat(defaultExpands);

       console.log(">>>> All expands" , allExpands);
       
       

    return (
     
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <DirectoryTree
        className="draggable-tree"
          onExpand={this.onExpand}
          
          expandedKeys={allExpands}
          autoExpandParent={this.state.autoExpandParent}
          treeData={loop(this.state.treeData)}
          draggable
          blockNode
         
          checkable
          showIcon={true}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        />
      </div>
    );
  }
}

export default SearchTree;