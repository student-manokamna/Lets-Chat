import { create } from "zustand";
//  we have to import create to use it
// set is to set the theme 
export const useThemeStore = create((set)=>({
    // If you want an arrow function to return an Object instantly, you MUST wrap the object {} in parentheses ().So, => ({ ... }) is basically a shortcut for saying => { return { ... } }.

theme: localStorage.getItem("check-it")|| "coffee",
//  it means ki jaise tumne set kr rkhi thi forest, but after refrsh it come to what u mntion by default that is coffer but we want ki humn jo set ki refresh k baad vo hi dikhyae default so we use locoalstorgae which tell ki humn previously ka store kr rkha tha

//  now set theme
setTheme: (theme)=>{
    localStorage.setItem("check-it", theme);
    //  above it means ki key: chek-it me ye theme daal do jo updated ho ke ayi hh na , u can give key any name but it should match above jo mention ki hh
    set({theme});
}
}))