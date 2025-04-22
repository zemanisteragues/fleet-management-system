import React from 'react';
import { Container } from 'components/shared';
import InvoiceContent from './InvoiceContent';
import { Card } from 'components/ui';

const StepThree = () => {
    return (
        <div className="mt-10">
            <h4 className="mb-3">Preview</h4>
            <Container className="h-full">
                <Card className="h-full" bodyClass="h-full">
                    <InvoiceContent />
                </Card>
            </Container>
        </div>
    );
};

export default StepThree;
