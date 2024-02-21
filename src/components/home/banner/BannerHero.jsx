import img1 from '../../../source/img/banner_img_01.jpg';
import img2 from '../../../source/img/banner_img_02.jpg';
import img3 from '../../../source/img/banner_img_03.jpg';
import
{
    Swiper,
    SwiperSlide,
    useSwiper,
}
    from 'swiper/react';
import {
    Navigation,
    Pagination,
} from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { useRef } from 'react';

const BannerHero = () => {

    const swiperRef = useRef(null);

    return (

        <div
            id='template-mo-zay-hero-carousel'
            className='carousel slide'
            data-bs-ride='carousel'
        >

            <div className='carousel-inner'>
                <Swiper
                    modules={[Navigation, Pagination ]}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide>
                        <div className='carousel-item'>
                            <div className='container'>
                                <div className='row p-5'>
                                    <div className='mx-auto col-md-8 col-lg-6 order-lg-last'>
                                        <img
                                            className='img-fluid'
                                            src={img1}
                                            alt=''
                                        />
                                    </div>
                                    <div className='col-lg-6 mb-0 d-flex align-items-center'>
                                        <div className='text-align-left align-self-center'>
                                            <h1 className='h1 text-success'><b>Zay</b> eCommerce</h1>
                                            <h3 className='h2'>Tiny and Perfect eCommerce Template</h3>
                                            <p>
                                                Zay Shop is an eCommerce HTML5 CSS template with latest version of
                                                Bootstrap
                                                5 (beta 1).
                                                This template is 100% free provided by <a
                                                className='text-success'
                                                href='https://templatemo.com'
                                            >TemplateMo</a> website.
                                                Image credits go to <a
                                                className='text-success'
                                                href='https://stories.freepik.com/'
                                            >Freepik Stories</a>,
                                                <a
                                                    className='text-success'
                                                    href='https://unsplash.com/'
                                                >Unsplash</a> and
                                                <a
                                                    className='text-success'
                                                    href='https://icons8.com/'
                                                >Icons 8</a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='carousel-item'>
                            <div className='container'>
                                <div className='row p-5'>
                                    <div className='mx-auto col-md-8 col-lg-6 order-lg-last'>
                                        <img
                                            className='img-fluid'
                                            src={img2}
                                            alt=''
                                        />
                                    </div>
                                    <div className='col-lg-6 mb-0 d-flex align-items-center'>
                                        <div className='text-align-left'>
                                            <h1 className='h1'>Proident occaecat</h1>
                                            <h3 className='h2'>Aliquip ex ea commodo consequat</h3>
                                            <p>
                                                You are permitted to use this Zay CSS template for your commercial
                                                websites.
                                                You are <strong>not permitted</strong> to re-distribute the template ZIP
                                                file in any kind of template collection websites.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='carousel-item'>
                            <div className='container'>
                                <div className='row p-5'>
                                    <div className='mx-auto col-md-8 col-lg-6 order-lg-last'>
                                        <img
                                            className='img-fluid'
                                            src={img3}
                                            alt=''
                                        />
                                    </div>
                                    <div className='col-lg-6 mb-0 d-flex align-items-center'>
                                        <div className='text-align-left'>
                                            <h1 className='h1'>Repr in voluptate</h1>
                                            <h3 className='h2'>Ullamco laboris nisi ut</h3>
                                            <p>
                                                We bring you 100% free CSS templates for your websites.
                                                If you wish to support TemplateMo, please make a small contribution via
                                                PayPal or tell your friends about our website. Thank you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/*<ol className='carousel-indicators'>*/}
                    {/*    <li*/}
                    {/*        className='swiper-pagination-bullet swiper-pagination-bullet-active'*/}
                    {/*    ></li>*/}
                    {/*    <li*/}
                    {/*        className='swiper-pagination-bullet'*/}
                    {/*    ></li>*/}
                    {/*    <li*/}
                    {/*        className='swiper-pagination-bullet'*/}
                    {/*    ></li>*/}
                    {/*</ol>*/}
                    {/*<div className="swiper-button-prev">*/}
                    {/*    <a className='carousel-control-prev text-decoration-none w-auto ps-3'>*/}
                    {/*        <i className='fas fa-chevron-left'></i>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                    {/*<div className="swiper-button-next">*/}
                    {/*    <a className='carousel-control-next text-decoration-none w-auto pe-3'>*/}
                    {/*        <i className='fas fa-chevron-right'></i>*/}
                    {/*    </a>*/}
                    {/*</div>*/}

                </Swiper>


            </div>

        </div>

    );
};
export default BannerHero;