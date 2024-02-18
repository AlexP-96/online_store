import ProductCard from "./product_card/ProductCard";
import OurBrands from "./our_brands/OurBrands";
import PaginationContent from "./pagination_content/PaginationContent";

const Shop = () => (
    <>
        <div className="modal fade bg-white" id="templatemo_search" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="w-100 pt-1 mb-5 text-right">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" method="get" className="modal-content modal-body border-0 p-0">
                    <div className="input-group mb-2">
                        <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..." />
                        <button type="submit" className="input-group-text bg-success text-light">
                            <i className="fa fa-fw fa-search text-white"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>


        <div className="container py-5">
            <div className="row">

                <div className="col-lg-3">
                    <h1 className="h2 pb-4">Categories</h1>
                    <ul className="list-unstyled templatemo-accordion">
                        <li className="pb-3">
                            <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="/">
                                Gender
                                <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                            </a>
                            <ul className="collapse show list-unstyled pl-3">
                                <li><a className="text-decoration-none" href="/">Men</a></li>
                                <li><a className="text-decoration-none" href="/">Women</a></li>
                            </ul>
                        </li>
                        <li className="pb-3">
                            <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="/">
                                Sale
                                <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                            </a>
                            <ul id="collapseTwo" className="collapse list-unstyled pl-3">
                                <li><a className="text-decoration-none" href="/">Sport</a></li>
                                <li><a className="text-decoration-none" href="/">Luxury</a></li>
                            </ul>
                        </li>
                        <li className="pb-3">
                            <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="/">
                                Product
                                <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                            </a>
                            <ul id="collapseThree" className="collapse list-unstyled pl-3">
                                <li><a className="text-decoration-none" href="/">Bag</a></li>
                                <li><a className="text-decoration-none" href="/">Sweather</a></li>
                                <li><a className="text-decoration-none" href="/">Sunglass</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-9">
                    <div className="row">
                        <div className="col-md-6">
                            <ul className="list-inline shop-top-menu pb-3 pt-1">
                                <li className="list-inline-item">
                                    <a className="h3 text-dark text-decoration-none mr-3" href="/">All</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="h3 text-dark text-decoration-none mr-3" href="/">Men's</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="h3 text-dark text-decoration-none" href="/">Women's</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 pb-4">
                            <div className="d-flex">
                                <select className="form-control">
                                    <option>Featured</option>
                                    <option>A to Z</option>
                                    <option>Item</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <ProductCard />

                    <PaginationContent/>
                </div>

            </div>
        </div>

        <OurBrands />
    </>
)
export default Shop;