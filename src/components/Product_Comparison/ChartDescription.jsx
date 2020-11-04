import React from "react";
import { Card } from "reactstrap";

export default function ChartDescription(props) {
    return (
        <React.Fragment>
            <Card className="widget-user">
                <div className="widget-user-desc p-4 text-center bg-primary position-relative">
                    <i className="fas fa-quote-left h2 text-white-50" />
                    <p className="text-white mb-0">This chart shows you European languages are members of the same family. Their separate
                        existence is a myth. For science, music, sport, etc, Europe the same vocabulary.</p>
                </div>
                <div className="p-4">
                    <h6 className="mb-1 font-size-16 mt-2">Markette</h6>
                </div>
            </Card>
        </React.Fragment>
    );
}