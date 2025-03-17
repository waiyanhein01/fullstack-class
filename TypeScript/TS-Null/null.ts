// let nullInfer = null;  ကိုယ်တိုင် မသတ်မှတ်ပဲ inference ပုံစံ null value ကို ထည့်လိုက်တဲ့အခါ TypeScript က any type အဖြစ် အလိုအလျောက် သတ်မှတ်သွားမှာပါ ။ 

let nullInfer = null;

//nullInfer = "string"; // any type ဖြစ်သွားတဲ့အတွက် ဘယ် Type ဖြစ်ဖြစ်လက်ခံလို့ရသွားပါတယ် ။

//nullInfer = 2; // Error Message လည်း မပြတော့ပါဘူး

console.log(nullInfer);