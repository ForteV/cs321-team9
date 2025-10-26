import Card from "../Card/Card.jsx"
import s from "../Card/Card.module.css";

export default function AddRecords() {
    return(    
        
        <Card 
            style={{ minHeight: '200px'}} 
            title="Optional Notes">
                <textarea 
                    className={s.expandableTextarea} 
                    rows={1} 
                    placeholder="Type here..." 
                    
                    onInput={(e) => {
                        const ta = e.currentTarget;
                        ta.style.height = '0px';
                        ta.style.height = ta.scrollHeight + 'px';
                        }}
                />
        </Card>
        


    );

}