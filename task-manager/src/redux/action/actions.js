import {shallowEqual, useDispatch,useSelector} from "react-redux";
import {useCallback} from "react";

//write to redux

export function useDispatchToProps(type) {
const dispatch = useDispatch();
const handleDispatch = (payload) =>{
    dispatch({type, payload})
};
return useCallback(handleDispatch,[type,dispatch]);
}
//read from redux
export function useStateToProps(selection,equality=shallowEqual) {
return useSelector(selection,equality);
}