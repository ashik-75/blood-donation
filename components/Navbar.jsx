import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_DONAR } from '../store/donar';

function Navbar() {
    const [selected, setSelected] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.donar);

    const handleLogout = () => {
        localStorage.removeItem('donar');
        dispatch({ type: REMOVE_DONAR.type });
    };

    return (
        <div className="flex items-center justify-between px-5 shadow-lg sticky top-0 left-0 w-full z-50 bg-white">
            <div className=" cursor-pointer">
                <Link href="/">
                    <img className="w-32" src="logo_1.png" alt="" />
                </Link>
            </div>

            <div className=" space-x-4 hidden md:flex">
                <div
                    className={`decoration-2 text-slate-500 tracking-wider font-bold underline-offset-4 ${
                        router.pathname === '/' && 'underline'
                    }`}
                >
                    <Link href="/">Home</Link>
                </div>

                <div
                    className={`text-slate-500 tracking-wider decoration-2 font-bold underline-offset-4 ${
                        router.pathname === '/donars' && 'underline'
                    }`}
                >
                    <Link href="/donars">Donars</Link>
                </div>

                {token ? (
                    <>
                        <div
                            className={`text-slate-500 tracking-wider decoration-2 font-bold underline-offset-4 ${
                                router.pathname === '/profile' && 'underline'
                            }`}
                        >
                            <Link href="/profile">Profile</Link>
                        </div>

                        <div onClick={handleLogout}>
                            <span className="bg-pink-500 font-bold cursor-pointer text-white py-1 px-2 rounded">
                                Logout
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className={`text-slate-500 tracking-wider decoration-2 font-bold underline-offset-4 ${
                                router.pathname === '/login' && 'underline'
                            }`}
                        >
                            <Link href="/login">Login</Link>
                        </div>
                        <div
                            className={`text-slate-500 tracking-wider decoration-2 underline-offset-4 font-bold ${
                                router.pathname === '/register' && 'underline'
                            }`}
                        >
                            <Link href="/register">Register</Link>
                        </div>
                    </>
                )}
            </div>

            <AnimatePresence>
                {selected && (
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
                        className="flex justify-center items-center top-0 right-0 md:hidden absolute w-[70%] h-[100vh] bg-slate-300"
                    >
                        <button
                            className="absolute top-4 right-3 bg-gray-100 rounded-full py-2 px-2 w-12 h-12"
                            type="button"
                            onClick={() => setSelected(false)}
                        >
                            X
                        </button>
                        <div className="space-y-3">
                            <div
                                className={`decoration-2 text-xl  tracking-wider font-bold underline-offset-4 ${
                                    router.pathname === '/' && 'underline'
                                }`}
                                onClick={() => setSelected(false)}
                            >
                                <Link href="/">Home</Link>
                            </div>

                            <div
                                className={` tracking-wider text-xl decoration-2 font-bold underline-offset-4 ${
                                    router.pathname === '/donars' && 'underline'
                                }`}
                                onClick={() => setSelected(false)}
                            >
                                <Link href="/donars">Donars</Link>
                            </div>
                            {token ? (
                                <>
                                    <div
                                        className={` tracking-wider decoration-2 text-xl font-bold underline-offset-4 ${
                                            router.pathname === '/profile' && 'underline'
                                        }`}
                                        onClick={() => setSelected(false)}
                                    >
                                        <Link href="/profile">Profile</Link>
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleLogout();
                                            setSelected(false);
                                        }}
                                        className="px-4 bg-pink-500 py-.5 text-xl text-white cursor-pointer text-sm py-1 rounded font-bold"
                                    >
                                        Logout
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={` tracking-wider text-xl decoration-2 font-bold underline-offset-4 ${
                                            router.pathname === '/login' && 'underline'
                                        }`}
                                        onClick={() => setSelected(false)}
                                    >
                                        <Link href="/login">Login</Link>
                                    </div>
                                    <div
                                        className={` tracking-wider text-xl decoration-2 underline-offset-4 font-bold ${
                                            router.pathname === '/register' && 'underline'
                                        }`}
                                        onClick={() => setSelected(false)}
                                    >
                                        <Link href="/register">Register</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div className="md:hidden" onClick={() => setSelected(true)}>
                <GiHamburgerMenu cursor="pointer" size={25} />
            </motion.div>
        </div>
    );
}

export default Navbar;
