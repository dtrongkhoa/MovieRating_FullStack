import Movies from "./Movies/Movies";
import './MainPage.css'

// Main page contents
function MainPage() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="p-2 m-2 bg-light border-dark text-dark text-center shadow rounded-2 brief-info">
        Loop Cinemas, Melbourne's newest entertainment destination, offers
        state-of-the-art movie theaters, immersive sound, and a diverse
        selection of films for an unparalleled cinematic experience. 
        <div>Come join
        us and get lost in the magic of storytelling on the big screen.</div>
        </div>
       
      </div>
      <Movies />  
    </div>
  );
}

export default MainPage;
