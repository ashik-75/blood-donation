import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileDetails from '../components/ProfileDetails';
import UpdateInfo from '../components/UpdateInfo';

const profile = () => {
    const { donar, token } = useSelector((state) => state.donar);
    const router = useRouter();

    return (
        <div className="p-5">
            {/* show button */}
            <div>
                <AnimatePresence>
                    {token && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 1,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 1,
                                },
                            }}
                            className="text-center space-x-4"
                        >
                            <span
                                className={
                                    router.query?.info === 'profile'
                                        ? 'bg-pink-700 py-1 px-2 text-white rounded'
                                        : 'text-slate-400'
                                }
                            >
                                <Link href="?info=profile">Profile Info</Link>
                            </span>
                            <span
                                className={
                                    router.query?.info === 'change'
                                        ? 'bg-pink-700 py-1 px-2 text-white rounded'
                                        : 'text-slate-400'
                                }
                            >
                                <Link href="?info=change">Change Info</Link>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div>
                <AnimatePresence>
                    {token && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 1,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 1,
                                },
                            }}
                        >
                            {router.query?.info === 'change' ? (
                                <UpdateInfo donar={donar} />
                            ) : (
                                <ProfileDetails donar={donar} />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="font-bold text-slate-500 text-center mt-10 text-xl">
                {!token && (
                    <div>
                        Create New Account
                        <Link href="/register">
                            <span className="ml-2 underline-offset-2 text-slate-800 underline cursor-pointer">
                                Register
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default profile;
