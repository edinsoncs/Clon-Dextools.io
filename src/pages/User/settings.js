import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';


function Settings() {

  return (
    <>

    <Sidebar />

    <main>
        <Header />

          <section className='editProfile__Contain'>

            <div className='editProfile__Header'>
              <h2>Settings Account</h2>
            </div>

            <article className='editProfile__Form'>
                <img src='/images/user-default.png' />
                <div className="editProfile__Avatar--Updated">
                  <a href="#">
                    UPDATE AVATAR
                  </a>
                </div>
            </article>

            <article className='editProfile__Form'>
                <div className="form-group">
                  <label htmlFor="">Public Address</label>
                  <input type="text" disabled value='00000'/>
                </div>

                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder='Enter Email' />
                </div>

                <div className="form-group">
                  <label htmlFor="">Nickname</label>
                  <input type="text" placeholder='Enter Nickname' />
                </div>

                <div className="form-group">
                  <label htmlFor="">Type</label>
                  <select name="" id="">
                    <option value="">Contributor</option>
                    <option value="">Investor</option>
                    <option value="">Moderator</option>
                    <option value="">Administrator</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="">Status</label>
                  <textarea name="" id="" cols="30" rows="5" placeholder='Write your status'>
                  </textarea>
                </div>

            </article>

          </section>


        <Footer/>

    </main>


    </>
  );
}

export default Settings;
