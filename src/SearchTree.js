import React from "react";
import { Tree, Input } from "antd";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";

import { CarryOutOutlined } from "@ant-design/icons";

const { DirectoryTree } = Tree;

const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
const gData = [];
let allParents = [];
let searchedParents = [];
let childrensWithActivePin = [];
let matchingNodes = [];
let selectedTree;
const treeData = [
  {
    key: 25,

    title: "SST",
    description: "SST Super Market Items",
    icon: <CarryOutOutlined />,

    subcategories: [
      {
        key: 26,
        title: "Dairy",
        description: "Dairy Products",
        parentKey: 25,
        icon: <CarryOutOutlined />,
        subcategories: [
          {
            key: 27,
            title: "Milk",
            description: "Milk Varieties",
            parentKey: 26,
            subcategories: [],
            itemDtos: [],
            itemStoreAllDto: [
              {
                key: 1,
                itemId: 1,
                title: "Nandini Pasteurised Toned Milk",
                categoryId: 27,
                categoryName: "Milk",
                imgPath: "images/items/Nandini_Pasteurised_Toned_Milk.png",
                isActive: true,
                storeId: 1,
                taxRateId: 0,
                minStock: 20,
                parentKey: 27,
                isLeaf: true,
                size: 0,
                cancellationNotes: {
                  Subscription:
                    "You can cancel the nextday delivery before 11pm",
                  Order: "You can cancel even one hour after delivery",
                },
                qty: {
                  total: "100",
                  expiry_date_today: "25",
                  expiry_date_tomorrow: "75",
                },
                physicalAttrs: {
                  length: "10",
                  breadth: "50",
                  weight: "30",
                },
                instructions: ["Handle with care"],
                active: true,
              },
              {
                key: 2,
                itemId: 2,

                title: "Nandini Shubham Pasteurized Standardized Milk",
                categoryId: 27,
                categoryName: "Milk",
                imgPath:
                  "images/items/Nandini_Shubham_Pasteurized_Standardized_Milk.png",
                isActive: true,
                storeId: 1,
                isLeaf: true,
                parentKey: 27,
                taxRateId: 0,
                minStock: 20,
                size: 0,
                cancellationNotes: {
                  Subscription:
                    "You can cancel the nextday delivery before 11pm",
                  Order: "You can cancel even one hour after delivery",
                },
                qty: {
                  total: "100",
                  expiry_date_today: "25",
                  expiry_date_tomorrow: "75",
                },
                physicalAttrs: {
                  length: "10",
                  breadth: "50",
                  weight: "30",
                },
                instructions: ["Handle with care"],
                active: true,
              },
            ],
            merchantId: 1,
            mechantId: 1,
            parentId: 26,
          },
          {
            key: 28,
            title: "Curd",
            description: "Curd Varieties",
            parentKey: 26,
            subcategories: [],
            itemDtos: [],
            itemStoreAllDto: [
              {
                key: 3,
                itemId: 3,
                title: "Nandini Curd",
                parentKey: 28,
                isLeaf: true,
                categoryId: 28,
                categoryName: "Curd",
                imgPath: "images/items/Nandini_Curd.png",
                isActive: true,
                storeId: 1,
                taxRateId: 0,
                minStock: 20,
                size: 0,
                cancellationNotes: {
                  Subscription:
                    "You can cancel the nextday delivery before 11pm",
                  Order: "You can cancel even one hour after delivery",
                },
                qty: {
                  total: "100",
                  expiry_date_today: "25",
                  expiry_date_tomorrow: "75",
                },
                physicalAttrs: {
                  length: "10",
                  breadth: "50",
                  weight: "30",
                },
                instructions: ["Handle with care"],
                active: true,
              },
            ],
            merchantId: 1,
            mechantId: 1,
            parentId: 26,
          },
        ],
        itemDtos: [],
        itemStoreAllDto: [],
        merchantId: 1,
        mechantId: 1,
        parentId: 25,
      },
      {
        key: 29,
        title: "Bakery",
        description: "Bakery Products",
        parentKey: 25,
        subcategories: [
          {
            key: 30,
            title: "Bread",
            description: "Bread Varieties",
            parentKey: 29,
            subcategories: [
              {
                key: 31,
                title: "Milk Bread",
                description: "Milk Bread Varieties",
                parentKey: 30,
                subcategories: [],
                itemDtos: [],
                itemStoreAllDto: [],
                merchantId: 1,
                mechantId: 1,
                parentId: 30,
              },
              {
                key: 32,
                title: "Wheat Bread",
                description: "Wheat Bread Varieties",
                parentKey: 30,
                subcategories: [],
                itemDtos: [],
                itemStoreAllDto: [
                  {
                    key: 4,
                    itemId: 4,
                    title: "Britannia 100% Whole Wheat Bread",
                    parentKey: 32,
                    categoryId: 32,
                    categoryName: "Wheat Bread",
                    imgPath: "images/items/Britannia_100pct_Whole_Wheat.png",
                    isActive: true,
                    isLeaf: true,
                    storeId: 1,
                    taxRateId: 0,
                    minStock: 20,
                    size: 0,
                    cancellationNotes: {
                      Subscription:
                        "You can cancel the nextday delivery before 11pm",
                      Order: "You can cancel or return before expiry date",
                    },
                    qty: {
                      total: "10",
                      expiry_date_today: "3",
                      expiry_date_tomorrow: "7",
                    },
                    physicalAttrs: {
                      length: "10",
                      breadth: "50",
                      weight: "30",
                    },
                    instructions: ["Handle with care"],
                    active: true,
                  },
                ],
                merchantId: 1,
                mechantId: 1,
                parentId: 30,
              },
            ],
            itemDtos: [],
            itemStoreAllDto: [],
            merchantId: 1,
            mechantId: 1,
            parentId: 29,
          },
        ],
        itemDtos: [],
        itemStoreAllDto: [],
        merchantId: 1,
        mechantId: 1,
        parentId: 25,
      },
    ],
    itemDtos: [],
    itemStoreAllDto: [],
    merchantId: 1,
    mechantId: 1,
    parentId: null,
  },
];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
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

let dataList = [];
const generateList = (data, prevNode) => {
  for (let i = 0; i < data.length; i++) {
    data[i].classesApplied = prevNode
      ? prevNode.classesApplied + " " + data[i].key
      : data[i].key;
    const node = data[i];
    const { key, parentKey, title, subcategories } = node;
    dataList.push({
      key: key,
      title: title,
      parentKey: parentKey,
      classesApplied: "lorem",
      isLeaf: subcategories ? false : true,
    });

    if (node.subcategories && node.subcategories.length !== 0) {
      generateList(node.subcategories, node);
    }

    if (node.itemStoreAllDto && node.itemStoreAllDto.length !== 0) {
      generateList(node.itemStoreAllDto, node);
    }
  }
};

generateList(treeData);

console.log(">>>>>> DATA LIST", dataList);

const getExpandsList = (parentKey, list) => {
  //getExpandsList.push();
  for (let i = 0; i < list.length; i++) {
    if (list[i].key && list[i].key === parentKey) {
      searchedParents.push(list[i].key);

      if (list[i].parentKey) {
        getExpandsList(list[i].parentKey, list);
      }
    }
  }
};

const getParentsByKeyList = (parentKey, list) => {
  //getExpandsList.push();
  for (let i = 0; i < list.length; i++) {
    if (list[i].key && list[i].key === parentKey) {
      allParents.push(list[i].key);

      if (list[i].parentKey) {
        getParentsByKeyList(list[i].parentKey, list);
      }
    }
  }
};

const selectTreeNode = (key, tree) => {
  if (tree.key === key) {
    selectedTree = tree;
  } else {
    if (tree.subcategories && tree.subcategories.length !== 0) {
      tree.subcategories.map((childItem) => {
        if (childItem.key === key) {
          selectedTree = childItem;
        } else {
          selectTreeNode(key, childItem);
        }
      });
    }
    if (tree.itemStoreAllDto && tree.itemStoreAllDto.length !== 0) {
      tree.itemStoreAllDto.map((childItem) => {
        if (childItem.key === key) {
          selectedTree = childItem;
        } else {
          selectTreeNode(key, childItem);
        }
      });
    }
  }
};

const setDefaultExpandsByIteratingTree = (key, tree) => {
  let allGreenStrings = localStorage.getItem("allGreens");

  if (allGreenStrings) {
    let previousGreens = JSON.parse(allGreenStrings);
    previousGreens.push(key);
    localStorage.setItem("allGreens", JSON.stringify(previousGreens));
  } else {
    let tempKeys = [];
    tempKeys.push(key);
    localStorage.setItem("allGreens", JSON.stringify(tempKeys));
  }

  if (tree.subcategories && tree.subcategories.length !== 0) {
    $.each(tree.subcategories, function (index, childItem) {
      setDefaultExpandsByIteratingTree(childItem.key, childItem);
    });
  }

  if (tree.itemStoreAllDto && tree.itemStoreAllDto.length !== 0) {
    $.each(tree.itemStoreAllDto, function (index, childItem) {
      setDefaultExpandsByIteratingTree(childItem.key, childItem);
    });
  }
};

const getAllPinnedChildren = (key, tree, currentKey) => {
  if (key !== currentKey) {
    if ($("#" + key).hasClass("pin-search")) {
      childrensWithActivePin.push(key);
    }
  }

  if (tree.subcategories && tree.subcategories.length !== 0) {
    $.each(tree.subcategories, function (index, childItem) {
      getAllPinnedChildren(childItem.key, childItem, currentKey);
    });
  }

  if (tree.itemStoreAllDto && tree.itemStoreAllDto.length !== 0) {
    $.each(tree.itemStoreAllDto, function (index, childItem) {
      getAllPinnedChildren(childItem.key, childItem, currentKey);
    });
  }
};

const removeAllGreens = (key, tree) => {
  let allGreenStrings = localStorage.getItem("allGreens");

  if (allGreenStrings) {
    let previousGreens = JSON.parse(allGreenStrings);
    var newRemovedGreens = previousGreens.filter(function (a) {
      return a !== key;
    });
    localStorage.setItem("allGreens", JSON.stringify(newRemovedGreens));
  }

  //expands.push(1);

  if (tree.subcategories && tree.subcategories.length !== 0) {
    $.each(tree.subcategories, function (index, childItem) {
      removeAllGreens(childItem.key, childItem);
    });
  }
  if (tree.itemStoreAllDto && tree.itemStoreAllDto.length !== 0) {
    $.each(tree.itemStoreAllDto, function (index, childItem) {
      removeAllGreens(childItem.key, childItem);
    });
  }
};

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true,
    treeData: treeData,
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: true,
    });
  };

  retrieveNodes = (searchKeyword) => {
    return dataList.filter(
      (item) => item && item.title.indexOf(searchKeyword) !== -1
    );
  };

  retrieveNodesByKey = (key) => {
    return dataList.filter((item) => item && item.key === key);
  };

  onChange = (e) => {
    const { value } = e.target;

    if (value.length > 3 || value === "") {
      // Getting back list of matched nodes by keyword in Search
      searchedParents = [];
      this.getMatchingNode(value);
      this.getAllParents(value);

      console.log(">>>> MATCHING NODES: ", searchedParents);

      this.setState(
        {
          expandedKeys: searchedParents,
          searchValue: value,
          autoExpandParent: true,
          searchOn: true,
        },
        () => {
          searchedParents = [];
        }
      );
    }
  };

  onDragEnter = (info) => {
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  OnPinClick = (event, targetKey, parentKey) => {
    event.preventDefault();
    event.stopPropagation();

    let clickedNodeKey = targetKey;

    if ($("#" + clickedNodeKey).hasClass("pin-search")) {
      console.log(">>>> Inside has class");

      // lets unpin item
      let pinnedItems = localStorage.getItem("pinnedItems");

      if (pinnedItems) {
        let previousPinnedItems = JSON.parse(pinnedItems);

        var newPins = previousPinnedItems.filter(function (a) {
          return a !== targetKey;
        });
        localStorage.setItem("pinnedItems", JSON.stringify(newPins));
      }

      // remove Greens logic

      allParents = [];
      this.getAllParentsByKey(parentKey);

      let anyParentGreen = false;

      console.log("****** SEARCHED PARENTS ARE :", allParents);

      if (allParents && allParents.length !== 0) {
        allParents.forEach((item) => {
          if ($("#" + item).hasClass("pin-search")) {
            anyParentGreen = true;
          }
        });
      }

      allParents = [];

      if (!anyParentGreen) {
        let rootData = [...this.state.treeData];
        selectTreeNode(targetKey, rootData[0]);

        removeAllGreens(targetKey, selectedTree);
      }

      // check active pin children
      selectedTree = null;
      let rootData = [...this.state.treeData];
      selectTreeNode(targetKey, rootData[0]);
      childrensWithActivePin = [];
      getAllPinnedChildren(targetKey, selectedTree, targetKey);

      childrensWithActivePin.forEach((item) => {
        selectedTree = null;
        let rootData = [...this.state.treeData];
        selectTreeNode(item, rootData[0]);

        setDefaultExpandsByIteratingTree(item, selectedTree);
      });

      // remove default expands

      this.setState(
        {
          changed: true,
        },
        () => {}
      );

      //
    } else {
      selectedTree = null;
      let rootData = [...this.state.treeData];
      selectTreeNode(targetKey, rootData[0]);

      allParents = [];
      this.getAllParentsByKey(parentKey);

      console.log("****** SEARCHED PARENTS ARE :", allParents);

      console.log(">>> Selected tree is ", selectedTree);
      setDefaultExpandsByIteratingTree(targetKey, selectedTree);
      let defaultExpands = localStorage.getItem("defaultExpands");
      let pinnedItems = localStorage.getItem("pinnedItems");

      if (defaultExpands) {
        let previousDefaultExpands = JSON.parse(defaultExpands);
        previousDefaultExpands.push(targetKey);
        allParents.map((item) => {
          previousDefaultExpands.push(item);
        });

        localStorage.setItem(
          "defaultExpands",
          JSON.stringify(previousDefaultExpands)
        );
      } else {
        let tempKeys = [];
        tempKeys.push(targetKey);

        allParents.map((item) => {
          tempKeys.push(item);
        });

        allParents = [];

        //tempKeys.push(parentKey);
        localStorage.setItem("defaultExpands", JSON.stringify(tempKeys));
      }

      if (pinnedItems) {
        let previousPinnedItems = JSON.parse(pinnedItems);
        previousPinnedItems.push(targetKey);
        localStorage.setItem(
          "pinnedItems",
          JSON.stringify(previousPinnedItems)
        );
      } else {
        let tempKeys = [];
        tempKeys.push(targetKey);
        localStorage.setItem("pinnedItems", JSON.stringify(tempKeys));
      }

      this.setState(
        {
          changed: true,
        },
        () => {
          console.log("*** Set state is happening!");
        }
      );
    }
  };

  onDrop = (info) => {
    console.log(" On Drop drop info >>> ", info);

    if (info.node.isLeaf && info.node.isLeaf == true) {
      alert("You cannot drop at leaf level!");
      return false;
    }

    const dropKey = info.node.props.eventKey;

    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.itemStoreAllDto && item.itemStoreAllDto.length !== 0 && item.subcategories && item.subcategories.length !== 0 ) {
          let childs  = item.subcategories;
          childs = childs.concat(item.itemStoreAllDto);
          return loop(childs, key, callback);
        }

        if (item.itemStoreAllDto && item.itemStoreAllDto.length !== 0) {
          return loop(item.itemStoreAllDto, key, callback);
        }
        if (item.subcategories && item.subcategories.length !== 0) {
          return loop(item.subcategories, key, callback);
        }
       
      });
    };
    const data = [...this.state.treeData];
    //const data = treeData;

    // Find dragObject
    console.log("^^^^^ WHAT HAPPENED TO DRAG OBJECT DATA ^^^^^^ ",data);
    console.log("^^^^^ WHAT HAPPENED TO DRAG KEY ^^^^^^ ",dragKey);
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      console.log(">>>>>>>>> WHAT IS DRAG KEY ", dragKey);
      console.log(">>>>>>>>> WHAT IS Array ", arr);
      console.log(">>>>>>>>> WHAT IS INDEX ", index);
      console.log(">>>>>>>>> WHAT IS ITEM ", item);
      arr.splice(index, 1);
      dragObj = item;
    });

    console.log("$$$$$ Drag Object $$$$", dragObj);

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        console.log("**** DROP OBJECT : ", info.node.key);
        console.log("**** WHAT IS DROP ITEM : ", item);
        console.log("**** WHAT IS DRAG ITEM : ", dragObj);
        if (dragObj.isLeaf && dragObj.isLeaf === true) {
          item.itemStoreAllDto = item.itemStoreAllDto || [];
          dragObj.parentKey = item.key;
          item.itemStoreAllDto.push(dragObj);
          console.log(
            "********* Inserting into item DTO ",
            item.itemStoreAllDto
          );


         
        } else {
          item.subcategories = item.subcategories || [];
          dragObj.parentKey = item.key;
          item.itemStoreAllDto.push(dragObj);
          console.log(
            "********* Inserting into subcategory ",
            item.subcategories
          );
        }

        console.log("Something after drop");
        // where to insert 示例添加到尾部，可以是随意位置
      });
    } else if (
      (info.node.props.subcategories || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      alert(">>>>>>>>>> In else if has childed");

      // loop(data, dropKey, (item) => {
      //   item.subcategories = item.subcategories || [];
      //   // where to insert 示例添加到头部，可以是随意位置
      //   item.subcategories.unshift(dragObj);
      // });
    } else {
      alert(">>>>>>>>>> In only else");

      // let ar;
      // let i;
      // loop(data, dropKey, (item, index, arr) => {
      //   ar = arr;
      //   i = index;
      // });
      // if (dropPosition === -1) {
      //   ar.splice(i, 0, dragObj);
      // } else {
      //   ar.splice(i + 1, 0, dragObj);
      // }
    }

    console.log("^^^^^^^^^^ Tree Data after Drop : ", treeData);

    this.setState({
      treeData: data,
    });
  };

  getAllParents(value) {
    const searchTargets = this.retrieveNodes(value);
    console.log("++++++ Search targets in all parents are :", searchTargets);
    searchedParents = [];
    searchTargets.map((item) => {
      getExpandsList(item.key, dataList);
    });
  }

  getMatchingNode(value) {
    const searchTargets = this.retrieveNodes(value);
    console.log("++++++ Search targets are :", searchTargets);
    matchingNodes = [];
    searchTargets.map((item) => {
      matchingNodes.push(item.key);
    });
  }

  getAllParentsByKey(key) {
    const keyTargets = this.retrieveNodesByKey(key);
    searchedParents = [];
    keyTargets.map((item) => {
      getParentsByKeyList(item.key, dataList);
    });
  }

// componentWillUpdate(){
//   dataList =[];
//     generateList(treeData);
//     console.log(">>>>>> DATA LIST AGAIN", dataList);
// }

  render() {



    let allGreensString = localStorage.getItem("allGreens");
    let greens = [];
    if (allGreensString) {
      greens = JSON.parse(allGreensString);
    }

    let pinnedItemsString = localStorage.getItem("pinnedItems");
    let pinnedItems = [];
    if (pinnedItemsString) {
      pinnedItems = JSON.parse(pinnedItemsString);
    }

    let defaultExpandsString = localStorage.getItem("defaultExpands");

    let defaultExpands = [];
    if (defaultExpandsString) {
      defaultExpands = JSON.parse(defaultExpandsString);
    }

    const {
      searchValue,
      expandedKeys,
      autoExpandParent,
      searchOn,
    } = this.state;
    let expandedKeysClubbed = expandedKeys.concat(defaultExpands);

    console.log(">>> TREE IN RENDER ", this.state.treeData);
    console.log(">>> expanded keys in render ", expandedKeysClubbed);
    const loop = (data) =>
      data.map((item) => {
        console.log(" $$$$$$ each item ", item);

        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const tabIcon =
          this.state.searchOn && this.state.searchOn === true ? (
            <FontAwesomeIcon
              onClick={(e) => this.OnPinClick(e, item.key, item.parentKey)}
              icon={faThumbtack}
            />
          ) : (
            ""
          );

        const title =
          index > -1 ? (
            <span
              className={greens && greens.includes(item.key) ? "green" : ""}
            >
              {beforeStr}
              <span className="site-tree-search-value">{searchValue} </span> {item.key}  {item.parentKey} 
              {afterStr}
              <span
                id={item.key}
                className={
                  item.classesApplied +
                  " " +
                  (pinnedItems && pinnedItems.includes(item.key)
                    ? "pin-search"
                    : "")
                }
              >
                {" "}
                {tabIcon}{" "}
              </span>
            </span>
          ) : (
            <span>
              <span
                className={greens && greens.includes(item.key) ? "green" : ""}
              >
                <span>
          <span>{item.title} {item.key} {item.parentKey}</span>{" "}
                </span>
              </span>
              <span
                id={item.key}
                className={
                  (pinnedItems && pinnedItems.includes(item.key)
                    ? "pin-search"
                    : "") +
                  " " +
                  item.classesApplied
                }
              >
                {" "}
                {tabIcon}
              </span>
            </span>
          );

        if (
          searchOn &&
          searchOn === true &&
          !expandedKeysClubbed.includes(item.key)
        ) {
          $("#" + item.key)
            .parentsUntil(".ant-tree-list-holder-inner")
          //  .hide();
            .css( "background-color", "red" );
          //  .css( "display", "none" );
        } else {
          $("#" + item.key)
            .parentsUntil(".ant-tree-list-holder-inner")
         //   .show();
             .css( "background-color", "white" );
        }

        let multiFolder = [];
        if (
          item.subcategories &&
          item.subcategories.length !== 0 &&
          item.itemStoreAllDto &&
          item.itemStoreAllDto.length !== 0
        ) {
          console.log(
            "^^^^^^^^ In both itemsDTO and subcategories  return ",
            item
          );
          let childs = item.itemStoreAllDto;
          childs =     childs.concat(item.subcategories);

          return (
            {
              title,
              key: item.key,
              parentKey: item.parentKey,
              children: loop(childs),
            }
        
            
          );
        }

        if (item.subcategories && item.subcategories.length !== 0) {
          console.log("^^^^^^^^ In only subcategory return ", item);
          return {
            title,
            key: item.key,
            parentKey: item.parentKey,
            children: loop(item.subcategories),
          };
        }

        if (item.itemStoreAllDto && item.itemStoreAllDto.length !== 0) {
          console.log("^^^^^^^^ In only itemdto return ", item);
          return {
            title,
            key: item.key,
            parentKey: item.parentKey,
            children: loop(item.itemStoreAllDto),
          };
        }

        console.log("^^^^^^^^ LAST RESORT ", item);

        return {
          title,
          key: item.key,
          parentKey: item.parentKey,
          isLeaf: item.isLeaf
        };
      });
    console.log("in last return");

    let expands = [...this.state.expandedKeys];
    let allExpands = expands.concat(defaultExpands);
    //le

    //let allExpands = expands;

    // console.log(">>>> All expands", allExpands);
    console.log(">>>>> tree data inside render: ", this.state.treeData);

    return (
      <div>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={this.onChange}
        />
        <DirectoryTree
          className="draggable-tree"
          onExpand={this.onExpand}
          expandedKeys={allExpands}
          defaultExpandedKeys={allExpands}
          autoExpandParent={false}
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
