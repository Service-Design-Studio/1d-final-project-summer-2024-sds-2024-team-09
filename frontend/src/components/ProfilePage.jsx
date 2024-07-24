import React from 'react';
import { FaHome, FaHistory, FaChartBar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('user-data');
        navigate('/user');
    };
    return (
        <div className="flex flex-col items-center">
            <div className="items-center rounded-lg w-96 p-6">
                <div className="font-ubuntu p-4 py-8 flex flex-col h-screen">
                    <h1 className="text-2xl text-primary font-bold mb-4">Profile Page</h1>

                    <div className="flex justify-center avatar">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full w-36 h-36">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>

                    <h2 className='text-2xl text-primary font-bold flex justify-center p-5'>Username</h2>

                    <div className='flex justify-center py-2'>
                        <div class="card w-96 h-24 rounded-xl bg-white shadow rounded-badge">
                            <Link to="/profile/particulars">
                                <div class="card h-12 px-4 flex flex-row items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" fill="#254777" d="M12.5 2.5C10.751 2.49968 9.03241 2.95811 7.5159 3.82953C5.99939 4.70096 4.73797 5.95489 3.85753 7.46619C2.97709 8.97748 2.50844 10.6933 2.49834 12.4423C2.48825 14.1913 2.93707 15.9124 3.80001 17.4337C4.38327 16.6757 5.13305 16.062 5.99136 15.64C6.84968 15.218 7.79355 14.999 8.75 15H16.25C17.2064 14.999 18.1503 15.218 19.0086 15.64C19.867 16.062 20.6167 16.6757 21.2 17.4337C22.0629 15.9124 22.5117 14.1913 22.5017 12.4423C22.4916 10.6933 22.0229 8.97748 21.1425 7.46619C20.262 5.95489 19.0006 4.70096 17.4841 3.82953C15.9676 2.95811 14.249 2.49968 12.5 2.5ZM22.4287 20.095C24.1 17.9162 25.004 15.2459 25 12.5C25 5.59625 19.4037 0 12.5 0C5.59626 0 1.40665e-05 5.59625 1.40665e-05 12.5C-0.00411273 15.246 0.899895 17.9162 2.57126 20.095L2.56501 20.1175L3.00876 20.6337C4.18112 22.0044 5.63674 23.1045 7.2753 23.8583C8.91385 24.6121 10.6964 25.0016 12.5 25C15.0342 25.0046 17.5092 24.2349 19.5937 22.7937C20.4824 22.1797 21.2882 21.4538 21.9912 20.6337L22.435 20.1175L22.4287 20.095ZM12.5 5C11.5054 5 10.5516 5.39508 9.84835 6.09834C9.14509 6.80161 8.75 7.75543 8.75 8.74999C8.75 9.74455 9.14509 10.6984 9.84835 11.4016C10.5516 12.1049 11.5054 12.5 12.5 12.5C13.4946 12.5 14.4484 12.1049 15.1516 11.4016C15.8549 10.6984 16.25 9.74455 16.25 8.74999C16.25 7.75543 15.8549 6.80161 15.1516 6.09834C14.4484 5.39508 13.4946 5 12.5 5Z"></path>
                                    </svg>
                                    <div className='flex-1 px-4 text-lg font-lato text-primary font-semibold'>Edit Your Particulars</div>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                        <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                                    </svg>
                                </div>
                            </Link>

                            <div class="divider divider-start text-white m-0 h-0">boo</div>

                            <Link to="/profile/accsettings">
                                <div class="card h-12 px-4 flex flex-row items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" fill="#254777" d="M14.8408 0.19C14.354 -5.58794e-08 13.7356 0 12.5001 0C11.2646 0 10.6475 -5.58794e-08 10.1593 0.19C9.51128 0.442764 8.99541 0.929707 8.72518 1.54375C8.60149 1.8225 8.55413 2.14875 8.53439 2.6225C8.52562 2.96575 8.42483 3.30121 8.24157 3.59715C8.0583 3.89309 7.79861 4.13973 7.48705 4.31375C7.16962 4.48138 6.81279 4.57018 6.44962 4.57193C6.08644 4.57368 5.72868 4.48831 5.40948 4.32375C4.96475 4.10125 4.64239 3.97875 4.32398 3.93875C3.62736 3.85185 2.9228 4.02975 2.36351 4.43375C1.9451 4.73625 1.6359 5.24125 1.01881 6.25C0.400404 7.25875 0.0925179 7.7625 0.022783 8.25625C-0.0693198 8.91375 0.120149 9.57875 0.549084 10.105C0.743816 10.345 1.01881 10.5463 1.4438 10.7987C2.07141 11.17 2.47403 11.8025 2.47403 12.5C2.47403 13.1975 2.07141 13.83 1.44511 14.2C1.01881 14.4537 0.743816 14.655 0.547768 14.895C0.336041 15.1549 0.180633 15.4521 0.0905237 15.7695C0.000414319 16.0868 -0.0226095 16.4179 0.022783 16.7438C0.0925179 17.2362 0.400404 17.7412 1.01881 18.75C1.63721 19.7588 1.9451 20.2625 2.36351 20.5662C2.92139 20.97 3.62663 21.1475 4.32398 21.0613C4.64239 21.0213 4.96475 20.8988 5.40948 20.6763C5.72884 20.5115 6.08685 20.426 6.45027 20.4277C6.8137 20.4295 7.17077 20.5184 7.48837 20.6862C8.12782 21.0362 8.50676 21.68 8.53439 22.3775C8.55413 22.8525 8.60149 23.1775 8.72518 23.4562C8.99359 24.0687 9.50937 24.5562 10.1593 24.81C10.6462 25 11.2646 25 12.5001 25C13.7356 25 14.354 25 14.8408 24.81C15.4889 24.5572 16.0047 24.0703 16.275 23.4562C16.3987 23.1775 16.446 22.8525 16.4658 22.3775C16.4921 21.68 16.8723 21.035 17.5131 20.6862C17.8305 20.5186 18.1874 20.4298 18.5505 20.4281C18.9137 20.4263 19.2715 20.5117 19.5907 20.6763C20.0354 20.8988 20.3578 21.0213 20.6762 21.0613C21.3735 21.1488 22.0788 20.97 22.6366 20.5662C23.055 20.2637 23.3642 19.7588 23.9813 18.75C24.5997 17.7412 24.9076 17.2375 24.9774 16.7438C25.0226 16.4178 24.9993 16.0867 24.909 15.7693C24.8187 15.452 24.663 15.1548 24.4511 14.895C24.2563 14.655 23.9813 14.4537 23.5563 14.2013C22.9287 13.83 22.5261 13.1975 22.5261 12.5C22.5261 11.8025 22.9287 11.17 23.555 10.8C23.9813 10.5463 24.2563 10.345 24.4524 10.105C24.6641 9.84507 24.8195 9.54786 24.9096 9.23054C24.9997 8.91322 25.0228 8.58208 24.9774 8.25625C24.9076 7.76375 24.5997 7.25875 23.9813 6.25C23.3629 5.24125 23.055 4.7375 22.6366 4.43375C22.0773 4.02975 21.3728 3.85185 20.6762 3.93875C20.3578 3.97875 20.0354 4.10125 19.5907 4.32375C19.2713 4.48854 18.9133 4.57402 18.5499 4.57227C18.1864 4.57052 17.8294 4.4816 17.5118 4.31375C17.2005 4.13958 16.941 3.89287 16.758 3.59694C16.575 3.30101 16.4744 2.96563 16.4658 2.6225C16.446 2.1475 16.3987 1.8225 16.275 1.54375C16.1412 1.23967 15.9457 0.963603 15.6997 0.731322C15.4536 0.499041 15.1617 0.315097 14.8408 0.19ZM12.5001 16.25C14.6974 16.25 16.4776 14.5712 16.4776 12.5C16.4776 10.4288 14.6961 8.75 12.5001 8.75C10.3028 8.75 8.52255 10.4288 8.52255 12.5C8.52255 14.5712 10.3041 16.25 12.5001 16.25Z"></path>
                                    </svg>
                                    <div className='flex-1 px-4 text-lg font-lato text-primary font-semibold'>Edit Account Settings</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                        <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className='flex justify-center py-2'>
                        <div class="card w-96 h-24 rounded-xl bg-white shadow rounded-badge">
                            <div class="card h-full px-4 flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="#254777" d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM18.3 8.5C18.1125 10.475 17.3 15.275 16.8875 17.4875C16.7125 18.425 16.3625 18.7375 16.0375 18.775C15.3125 18.8375 14.7625 18.3 14.0625 17.8375C12.9625 17.1125 12.3375 16.6625 11.275 15.9625C10.0375 15.15 10.8375 14.7 11.55 13.975C11.7375 13.7875 14.9375 10.875 15 10.6125C15.0087 10.5727 15.0075 10.5315 14.9966 10.4923C14.9857 10.453 14.9654 10.4171 14.9375 10.3875C14.8625 10.325 14.7625 10.35 14.675 10.3625C14.5625 10.3875 12.8125 11.55 9.4 13.85C8.9 14.1875 8.45 14.3625 8.05 14.35C7.6 14.3375 6.75 14.1 6.1125 13.8875C5.325 13.6375 4.7125 13.5 4.7625 13.0625C4.7875 12.8375 5.1 12.6125 5.6875 12.375C9.3375 10.7875 11.7625 9.7375 12.975 9.2375C16.45 7.7875 17.1625 7.5375 17.6375 7.5375C17.7375 7.5375 17.975 7.5625 18.125 7.6875C18.25 7.7875 18.2875 7.925 18.3 8.025C18.2875 8.1 18.3125 8.325 18.3 8.5Z"></path>
                                </svg>
                                <div className='flex-1 px-4 text-lg font-lato text-primary font-semibold'>Enable Telegram</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                    <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                                </svg>
                            </div>

                            <div class="divider divider-start text-white m-0 h-0">boo</div>

                            <div class="card h-full px-4 flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="#254777" d="M3.925 19.4625C3.925 18.125 5.4 15.625 6.9625 13.5125C8.525 15.625 10 18.125 10 19.4625C10 19.8614 9.92143 20.2564 9.76878 20.6249C9.61613 20.9934 9.39239 21.3283 9.11034 21.6103C8.82828 21.8924 8.49343 22.1161 8.1249 22.2688C7.75637 22.4214 7.36139 22.5 6.9625 22.5C5.2875 22.5 3.925 21.1375 3.925 19.4625ZM25 12.5C25 15.8152 23.683 18.9946 21.3388 21.3388C18.9946 23.683 15.8152 25 12.5 25C11.35 25 10.225 24.825 9.1625 24.5375C10.1538 24.1101 10.9981 23.4017 11.5912 22.4998C12.1844 21.5979 12.5003 20.542 12.5 19.4625C12.5 18.9 12.3625 18.25 12.1125 17.5H12.5C14.0625 17.5 15.4 18.125 15.9625 19.0375L17.7375 17.2625C16.6125 15.9 14.6875 15 12.5 15C11.9875 15 11.4875 15.05 11.0125 15.15C10.475 14.2 9.8125 13.1625 8.9875 12.0375L8.3875 11.25C9.275 11.0875 10 10.2875 10 9.375C10 8.375 9.125 7.5 8.125 7.5C7.125 7.5 6.25 8.375 6.25 9.375C6.25 9.6125 6.3 9.8375 6.3875 10.05L4.95 12.0375C3 14.6875 1.875 16.875 1.5375 18.5125C0.5625 16.725 0 14.675 0 12.5C0 9.18479 1.31696 6.00537 3.66117 3.66117C6.00537 1.31696 9.18479 0 12.5 0C14.1415 0 15.767 0.323322 17.2835 0.951506C18.8001 1.57969 20.1781 2.50043 21.3388 3.66117C22.4996 4.8219 23.4203 6.19989 24.0485 7.71646C24.6767 9.23303 25 10.8585 25 12.5ZM18.75 9.375C18.75 8.375 17.875 7.5 16.875 7.5C15.875 7.5 15 8.375 15 9.375C15 10.375 15.875 11.25 16.875 11.25C17.875 11.25 18.75 10.375 18.75 9.375Z"></path>
                                </svg>
                                <div className='flex-1 px-4 text-lg font-lato text-primary font-semibold'>Cry Detection Settings</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                    <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center py-2'>
                        <div class="card w-96 h-24 rounded-xl bg-white shadow rounded-badge">
                            <Link to="/profile/editcams">
                                <div class="card h-12 px-4 flex flex-row items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
                                        <path d="M16.4062 11.2846C16.4062 12.4357 15.9947 13.5397 15.2621 14.3537C14.5296 15.1676 13.536 15.6249 12.5 15.6249C11.464 15.6249 10.4704 15.1676 9.73786 14.3537C9.0053 13.5397 8.59375 12.4357 8.59375 11.2846C8.59375 10.1335 9.0053 9.02953 9.73786 8.21557C10.4704 7.40161 11.464 6.94434 12.5 6.94434C13.536 6.94434 14.5296 7.40161 15.2621 8.21557C15.9947 9.02953 16.4062 10.1335 16.4062 11.2846Z" fill="#254777" />
                                        <path d="M3.125 3.47222C2.2962 3.47222 1.50134 3.83804 0.915291 4.48921C0.32924 5.14038 0 6.02355 0 6.94444L0 17.3611C0 18.282 0.32924 19.1652 0.915291 19.8163C1.50134 20.4675 2.2962 20.8333 3.125 20.8333H21.875C22.7038 20.8333 23.4987 20.4675 24.0847 19.8163C24.6708 19.1652 25 18.282 25 17.3611V6.94444C25 6.02355 24.6708 5.14038 24.0847 4.48921C23.4987 3.83804 22.7038 3.47222 21.875 3.47222H20.0438C19.215 3.47203 18.4203 3.10607 17.8344 2.45486L16.5406 1.01736C15.9547 0.366148 15.16 0.000196658 14.3313 0H10.6687C9.84002 0.000196658 9.04529 0.366148 8.45938 1.01736L7.16563 2.45486C6.57971 3.10607 5.78498 3.47203 4.95625 3.47222H3.125ZM3.90625 6.94444C3.69905 6.94444 3.50034 6.85299 3.35382 6.6902C3.20731 6.5274 3.125 6.30661 3.125 6.07639C3.125 5.84617 3.20731 5.62537 3.35382 5.46258C3.50034 5.29979 3.69905 5.20833 3.90625 5.20833C4.11345 5.20833 4.31216 5.29979 4.45868 5.46258C4.60519 5.62537 4.6875 5.84617 4.6875 6.07639C4.6875 6.30661 4.60519 6.5274 4.45868 6.6902C4.31216 6.85299 4.11345 6.94444 3.90625 6.94444ZM17.9688 11.2847C17.9688 12.8963 17.3926 14.4418 16.367 15.5814C15.3414 16.7209 13.9504 17.3611 12.5 17.3611C11.0496 17.3611 9.6586 16.7209 8.63301 15.5814C7.60742 14.4418 7.03125 12.8963 7.03125 11.2847C7.03125 9.67316 7.60742 8.12761 8.63301 6.98807C9.6586 5.84852 11.0496 5.20833 12.5 5.20833C13.9504 5.20833 15.3414 5.84852 16.367 6.98807C17.3926 8.12761 17.9688 9.67316 17.9688 11.2847Z" fill="#254777" />
                                    </svg>
                                    <div className='flex-1 px-4 text-lg font-lato text-primary font-semibold'>Add/Delete Camera</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                        <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                                    </svg>
                                </div>
                            </Link>

                            <div class="divider divider-start text-white m-0 h-0">boo</div>

                            <div class="card h-12 px-4 flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24" fill="none">
                                    <path d="M5.75 8.875C5.75 8.875 2.53562 10.125 2 14.5M23.25 8.875C23.25 8.875 26.4644 10.125 27 14.5M10.75 8.875C10.75 8.875 13.75 9.60437 14.5 13.25C15.25 9.60437 18.25 8.875 18.25 8.875M12 18.25C12 18.25 9.375 18.7188 8.25 22M17 18.25C17 18.25 19.625 18.7188 20.75 22" stroke="#254777" stroke-width="3" stroke-linecap="round" />
                                    <path d="M14.5 19.5C16.2259 19.5 17.625 18.1009 17.625 16.375C17.625 14.6491 16.2259 13.25 14.5 13.25C12.7741 13.25 11.375 14.6491 11.375 16.375C11.375 18.1009 12.7741 19.5 14.5 19.5Z" stroke="#254777" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M20.75 9.5C22.8211 9.5 24.5 7.82107 24.5 5.75C24.5 3.67893 22.8211 2 20.75 2C18.6789 2 17 3.67893 17 5.75C17 7.82107 18.6789 9.5 20.75 9.5Z" stroke="#254777" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.25 9.5C10.3211 9.5 12 7.82107 12 5.75C12 3.67893 10.3211 2 8.25 2C6.17893 2 4.5 3.67893 4.5 5.75C4.5 7.82107 6.17893 9.5 8.25 9.5Z" stroke="#254777" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <div className='flex-1 px-4 text-lg font-lato text-primary font-semibold'>Trusted Members</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                                    <path fill="#C3C6CF" d="M9.6024 9.4443L1.92021 17L0 15.1114L6.72209 8.5L0 1.88859L1.92021 0L9.6024 7.5557C9.85698 7.80617 10 8.14584 10 8.5C10 8.85416 9.85698 9.19383 9.6024 9.4443Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center py-2'>
                        <div class="card w-96 h-12 rounded-xl bg-white shadow rounded-badge">
                            <button onClick={handleLogout} className="btn btn-primary text-white font-lato text-lg">
                                Log out
                            </button>
                        </div>
                    </div>
                    <Navbar />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;