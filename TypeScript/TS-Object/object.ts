// ရိုးရိုး JavaScript မှာလိုပဲ Object တစ်ခု Key-Value Pairs တွေနဲ့ တည်ဆောက်ပါတယ်
// Object Type ကို ရေးသား ဖို့အတွက် TypeScript မှာ Property နဲ့ ValueType ကို သတ်မှတ်ရေးသားကြပါတယ် ။

// Object Type Annotation

// const person ရဲ့နောက်မှာ object type အဖြစ် ဆိုင်ရာ property တွေနဲ့ type တွေ အရင်သတ်မှတ်လိုက်ပါတယ် ။
// ပြီးတဲ့နောက်မှာ တန်ဖိုးကို Assign လုပ်လိုက်ပါတယ် ။
// အောက်က Code အတိုင်းဖြစ်သွားမှာပါ ။

const person: {
  name: string;
  age: number;
  status: "active" | "inactive";
  isAdmin: boolean;
} = {
  name: "Lwin",
  age: 28,
  status: "active",
  isAdmin: true,
};

// Optional Properties

// Object ထဲက တချို့ property တွေ မဖြည့်လည်း ရအောင် ? (question mark) ကို သုံးနိုင်ပါတယ်။
// နမူနာ code ထဲမှာ age , status ရယ်ကို ?: သုံးပြီး ရေးသားလိုက်တဲ့အတွက်  Assign  မထည့်ဘဲ ရေးသားနိုင် သွားပါတယ်။