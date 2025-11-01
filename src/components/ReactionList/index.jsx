//-----------------------------------------------------------------------------------------
//Display Reactions Component
export default function DisplayReactions({ reaction, submitFunction, formAction }) {
  return (
    <div className="reaction-container">
      <div className="reaction-info">
        <p>Staff #{reaction.staff_id}</p>
        <p style={{ fontSize: "1.4rem" }}>
          {reaction.score === 1 ? "😐" : reaction.score === 2 ? "🙂" : "🤩"}
        </p>
      </div>
      <form onSubmit={(evt) => submitFunction(evt, reaction.id)}>
        <button type="submit" className="btn submit">{formAction}</button>
      </form>
    </div>
  );
}
