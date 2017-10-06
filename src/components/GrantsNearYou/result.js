import Currency from 'react-currency-formatter';

function convertUnicode(input) {
  return input.replace(/\\u(\w\w\w\w)/g,function(a,b) {
    var charcode = parseInt(b,16);
    return String.fromCharCode(charcode);
  });
}

export const Result = ({result}) => (

  <div className="result">

    <div className="result__inner">

      <section className="single-msg paragraph single-msg--copy-right">

        <div className="single-msg__outer-wrapper">

          <div className="single-msg__image">

            <picture>
              <source srcset="/assets/no_image.jpg"
                      media="all and (min-width: 1024px)" type="image/jpeg"/>
              <source srcset="/assets/no_image.jpg"
                      media="all and (min-width: 740px)" type="image/jpeg"/>
              <source srcset="/assets/no_image.jpg"
                      media="(min-width: 0px)" type="image/jpeg"/>
              <img src="/assets/no_image.jpg"
                   typeof="foaf:Image"/>
            </picture>

          </div>

          <div className="single-msg__copy_wrapper">

            <div className="single-msg__copy">

              <div className="single-msg__title">
                <h3><strong dangerouslySetInnerHTML={{ __html: convertUnicode(result.name)}}/> <small>({result.issue})</small></h3>
              </div>

              <div className="single-msg__body">
                <p>
                  <strong>Grant ID:</strong> {result.grants_project_id} <br/>
                  <strong>Start Date:</strong> {result.start_date} <br/>
                  <strong>Country:</strong> {result.country_name} <i>Lat: {result.lat}, Lng: {result.lng}</i><br/>
                  <strong>Amount</strong>
                  <Currency quantity={result.amount_awarded} currency="GBP" pattern=" !##,### "/>
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  </div>
);
