/**
 * Created by aine on 6/24/16.
 */
var EditTemplate =  React.createClass({
    addItem:function (item){
        this.props.addItem(item);
    },
    removeItem:function (){
        var index = $(event.currentTarget).data("item-index");
        this.props.removeFormItem(index);
    },
    render:function (){
        return (
            <div className="controls-wrapper">
                {
                    this.props.items.map(function (item){
                        return (<div className="item-wrapper">
                            {
                                (function (){
                                    if (item.type == "date"){
                                        return (<input type="date" className="text-input date-input" />)
                                    }
                                    else{
                                        return (<input type="text" className="text-input" />)
                                    }
                                })()
                            }
                            <span className="common-button delete-button">一</span>
                        </div>)
                    })
                }
            </div>
        )
    }
});
var PreviewTemplate = React.createClass({
    render:function (){
        return (
            <div className="controls-wrapper">
                {
                    this.props.items.map(function (item){
                        return (<div className="item-wrapper">
                            {
                                (function (){
                                    if (item.type == "date"){
                                        return (<input type="date" className="text-input date-input" />)
                                    }
                                    else{
                                        return (<input type="text" className="text-input" />)
                                    }
                                })()
                            }
                        </div>)
                    })
                }
            </div>
        )
    }
});

var ChooseDialog = React.createClass({
    render:function (){
        return (
            <div className="full-size">
                <input type="radio" name="formElement" checked value="文本" className="radio-input" />
                <br />
                <input type="radio" name="formElement" value="日期" className="radio-input" />
                <br />
                <input type="button" className="edit-button" value="选择" />
            </div>
        )
    }
});
var MyContainer = React.createClass({
    getInitialState:function (){
        return ({
            status:"edit",
            items:[
                {
                    type:"text"
                },
                {
                    type:"date"
                },
                {
                    type:"date"
                }
            ]
        })
    },
    addFormItem:function (item) {
        this.state.items.push(item);
        this.setState(this.state);
    },
    removeFormItem:function (index) {
        this.state.items.splice(index, 1);
        this.setState(this.state);
    },
    popupDialog:function (){
        alert("a");
    },
    renderEditor:function (){
        this.state.status = "edit";
    },
    renderPreview:function (){
        this.state.status = "preview";
    },
    render:function () {
        var self = this;
        return (
            <div>
                {(function (){
                   if (self.state.status == "edit"){
                       return (<span className="edit-button" onClick={self.renderPreview}>预览</span>)
                   }else{
                       return (<span className="edit-button" onclick={self.renderEditor}>编辑</span>)
                   }
                })()}
                {(function (){
                    if (self.state.status == "edit"){
                        return (<EditTemplate items={self.state.items}
                        addFormItem={self.addFormItem} removeFormItem={self.removeFormItem} />)
                    }
                    else{
                        return (<PreviewTemplate items={self.state.items} />);
                    }
                })()}
                {(function (){
                    if (self.state.status == "edit"){
                        return (<span className="common-button add-button" onclick={self.popupDialog}>+</span>)
                    }else{
                        return (<span className="edit-button">提交</span>)
                    }
                })()}
            </div>
        )
    }
});

ReactDOM.render(<MyContainer />,
    document.getElementById("container"));