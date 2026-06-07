import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm"; 

 



const Login = () => {
  return (
   
    <div className="d-flex flex-column min-vh-100 bg-transparent">
      
    
      <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="col-11 col-sm-8 col-md-5 col-lg-4 mx-auto">
          <LoginForm />
        </div>
      </main>

     
      <Footer />

    </div>
  );
};

export default Login;