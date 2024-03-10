import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ setPage, numPages }) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }

    return(
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
            }}
        >
            <Pagination 
                count={numPages} 
                onChange={(e) => handlePageChange(e.target.textContent)} 
                color="primary"
            />
        </div>
    )
}

export default CustomPagination;