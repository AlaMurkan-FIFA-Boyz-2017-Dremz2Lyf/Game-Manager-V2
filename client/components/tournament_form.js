import React from 'react';


const TournamentForm = (props) => {

  return (
    <form>
      <div>
        <label>Tournament Name</label>
        <div>
          <Field name="name" component="input" type="text" placeholder="Tournament Name"/>
        </div>
      </div>
    </form>
  );
};
