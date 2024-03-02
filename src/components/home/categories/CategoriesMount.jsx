import img1 from '../../../source/img/category_img_01.jpg';
import img2 from '../../../source/img/category_img_02.jpg';
import img3 from '../../../source/img/category_img_03.jpg';


const CategoriesMounts = () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFMZXhSZWFjdCIsImlhdCI6MTcwOTE5NTc5OCwiZXhwIjoxNzA5MjgyMTk4fQ.9cNnN47TSeM1Trwnk_NjpQCMBDon6RamchqvIic1vA0"

    const getUser = async () => {

        const response = await fetch('http://localhost:3000/api/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'ALexReact',
                password: '12345122'
            })
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error('Ошибка сети при попытке выполнить запрос.');
        }).then(data => {
            console.log(data);
        })


    }

    return (
        <section className="container py-5">
        <div className="row text-center pt-3">
            <div className="col-lg-6 m-auto">
        <h1 className="h1">Categories of The Month</h1>
                <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="/"><img src={img1} alt='img' className="rounded-circle img-fluid border"/></a>
                <h5 className="text-center mt-3 mb-3" onClick={getUser}>Watches</h5>
                <p className="text-center"><a href='/' className="btn btn-success">Go Shop</a></p>
            </div>
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="/"><img src={img2} alt='img' className="rounded-circle img-fluid border"/></a>
                <h2 className="h5 text-center mt-3 mb-3">Shoes</h2>
                <p className="text-center"><a href='/' className="btn btn-success">Go Shop</a></p>
            </div>
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="/"><img src={img3} alt='img' className="rounded-circle img-fluid border"/></a>
                <h2 className="h5 text-center mt-3 mb-3">Accessories</h2>
                <p className="text-center"><a href='/' className="btn btn-success">Go Shop</a></p>
            </div>
        </div>
    </section>
    )
}

export default CategoriesMounts;