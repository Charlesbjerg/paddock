"use client";
import React from 'react'
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { SelectDrivers, SelectLapTimes, SelectPitStops } from '@/db/schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import SingleDriverLapTimes from '../charts/SingleDriverLapTimes';


type ResultsDialogProps = {
    driver: SelectDrivers;
    results: Array<SelectLapTimes>;
    pitStops: Array<SelectPitStops>;
}

export default function DriverResultsDialog({ driver, results, pitStops }: ResultsDialogProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button>View Results</Button>
                </DialogTrigger>
                <DialogContent className='max-w-7xl max-h-[80vh] overflow-auto'>
                    <DialogHeader>
                        <DialogTitle>Race Results for {driver.forename} {driver.surname}</DialogTitle>
                        <DialogDescription>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="lap-times">
                                    <AccordionTrigger>Lap Times</AccordionTrigger>
                                    <AccordionContent>
                                        <SingleDriverLapTimes lapTimes={results} />
                                        {/* {results.map((result, index) => (
                                            <article key={index} className='flex items-center gap-x-4 flex-wrap'>
                                                <p>P{result.position}</p>
                                                <p>Lap {result.lap}</p>
                                                <p>{result.time}</p>
                                            </article>
                                        ))} */}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="pit-stops">
                                    <AccordionTrigger>Pit Stops</AccordionTrigger>
                                    <AccordionContent>
                                        {pitStops.map((pitStop, index) => (
                                            <pre key={index}>{JSON.stringify(pitStop, null, 4)}</pre>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
