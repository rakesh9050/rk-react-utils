import moment from "moment";

export {default as Avatar} from "./Avatar";
export {default as Button} from "./Button";
export {default as TableButton} from "./Button/TableButton";
export {default as Card} from "./Card";
export {default as Checkbox} from "./CheckBox";
export {default as DatePicker} from "./DatePicker";
export {default as Drawer} from "./Drawer";
export {default as DropDown} from "./DropDown";
export {default as Form} from "./Form";
export {default as HyperLink} from "./HyperLink";
export {default as Icon} from "./Icon";
export {default as Modal} from "./Modal";
export {default as notification} from "./Notification";
export {default as Pagination} from "./Pagination";
export {default as Popconfirm} from "./Popconfirm";
export {
    SelectRc as FormSelect,
    SelectFilterComponent as Select
} from "./Select";
export {default as Table} from "./Table";
export {default as TableComp} from "./Table";
export {default as Tabs} from "./Tabs";
export {default as TimePicker} from "./TimePicker";
export {default as Tooltip} from "./Tooltip";
export {titleComponent as Title} from "./component";
export {default as InputBox} from "./inputComponent";
export {default as PhoneInput} from "./PhoneInput";
export {default as Switch} from "./Switch";
export {default as Radio} from "./RadioButton";
export {default as Input} from "./Input";
export {default as InputNumber} from "./Input";
export {default as Spin} from "./Spin";
export {default as Row} from "./Row";
export {default as Col} from "./Col";
export {default as Empty} from "./Empty";
export {default as Tag} from "./Tag";
export {default as TextArea} from "./TextArea";
export {default as List} from "./List";
export {default as Divider} from "./Divider";
export {default as Alert} from "./Alert";
export {default as Progress} from "./Progress";
export {default as Carousel} from "./Carousel";
export {default as Skeleton} from "./Skeleton";
export {default as ActionButton} from "./Button/actionButton";
export {default as Collapse} from "./Collapse";
export {default as AutoComplete} from "./AutoComplete";
export {default as renderHTML} from "./renderHTML";
export {default as Steps} from "./Steps";
export {default as styled} from "./styled";

export const displayDate = (date) => {
    if (date) {
        // return moment(date).format("DD MMMM YYYY");
        return moment(date).format("DD-MM-YYYY");
    } else {
        return null;
    }
};
export const appDisplayDate = (date) => {
    if (date) {
        return moment(date).format("DD/MM/YYYY");
    } else {
        return null;
    }
};
export const displayTime = (date) => {
    if (date) {
        return moment(date).format("hh:mm a");
    } else {
        return null;
    }
};
export const longDisplayDate = (date) => {
    if (date) {
        return moment(date).format("DD-MM-YYYY | h:mm A");
    } else {
        return null;
    }
};

export const DefaultTablePagination = (
    newParams,
    defaultPageSize = 20,
    pageSizeOptions = ["20", "50", "75", "100"]
) => {
    let params = {
        defaultPageSize,
        pageSizeOptions,
        ...newParams,
        position: "top",
    };
    return params;
};
