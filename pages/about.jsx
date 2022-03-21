/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function About() {
    return (
        <div className="p-10">
            <div className="shadow-lg space-y-10 p-5 md:p-10">
                <div className="font-bold text-lg text-justify">
                    আমরা ধুনটবাসী" সংগঠন কর্তৃক পরিচালিত স্বেচ্ছায় রক্তদান সংগঠন "লাল ভালোবাসা
                </div>

                <div className="mb-5 space-y-3">
                    <div className="font-bold text-lg">যোগাযোগ :</div>
                    <div className="tracking-wide">
                        মোবাইল নম্বর : ০১৬৭৭-৪৮৬৩৬৯ (আঁখিনূর জামান বকুল)
                    </div>

                    <div className="tracking-wide">
                        <span className="mr-2">ই-মেইল :</span>
                        <span className="underline underline-offset-4 block md:inline">
                            amrashunatbashi@gmail.com
                        </span>
                    </div>
                </div>

                <div className="flex-col md:flex items-center justify-center">
                    <img src="/logo-1.png" className="h-20" alt="" />
                    <span className="block font-bold text-lg text-justify mt-5 md:mt-0">
                        "শিক্ষার আলোয় আলোকিত ধুনট গড়তে একটি অরাজনৈতিক ও অলাভজনক সামাজিক সংগঠন"।
                    </span>
                </div>
            </div>
        </div>
    );
}

export default About;
